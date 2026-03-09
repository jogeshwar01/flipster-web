import { WEBSOCKET_SERVER_URL } from "./constants";
import { Ticker } from "./types";
import {
  CallbackMap,
  ChannelType,
  DepthData,
  FlipsterSubscription,
  FlipsterWsResponse,
} from "./ws_types";

export class WsManager {
  private ws: WebSocket;
  private static instance: WsManager;
  private bufferedMessages: FlipsterSubscription[] = [];
  private callbacks: CallbackMap = {
    "market/orderbooks-v2": [],
    "market/tickers": [],
    "market/pswap-details": [],
  };
  private initialized: boolean = false;
  private subscribedChannels: Map<string, Set<string>> = new Map(); // channel -> Set of symbols

  private constructor() {
    this.ws = new WebSocket(WEBSOCKET_SERVER_URL);
    this.bufferedMessages = [];
    this.init();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new WsManager();
    }
    return this.instance;
  }

  async init() {
    this.ws.onopen = () => {
      console.log("WebSocket connected to Flipster");
      this.initialized = true;
      this.bufferedMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };

    this.ws.onmessage = async (event) => {
      try {
        const messageData = event.data;
        let decodedStr: string;

        // Handle both string and Blob data
        if (typeof messageData === "string") {
          decodedStr = messageData;
        } else {
          const arrayBuffer = await messageData.arrayBuffer();
          const decoder = new TextDecoder("utf-8");
          decodedStr = decoder.decode(new Uint8Array(arrayBuffer));
        }

        const messageJson: FlipsterWsResponse = JSON.parse(decodedStr);

        // Flipster response format: {"t": {"channel": {"s": {"SYMBOL": {...}}}}, "p": "..."}
        if (messageJson.t) {
          // Iterate through all channels in the response
          Object.keys(messageJson.t).forEach((channelType) => {
            const channelData = messageJson.t![channelType];

            // Handle both 's' (snapshot/full data) and 'u' (update) fields
            const dataContainer = channelData.s || channelData.u;

            if (dataContainer && this.callbacks[channelType]) {
              // Iterate through all symbols in this channel
              Object.keys(dataContainer).forEach((symbol) => {
                const symbolData = dataContainer[symbol];

                // Find callbacks registered for this channel and symbol
                this.callbacks[channelType].forEach(({ callback, channel }) => {
                  if (
                    channel === symbol ||
                    channel === `${channelType}:${symbol}`
                  ) {
                    // Handle different channel types
                    if (channelType === "market/orderbooks-v2") {
                      const depthData: DepthData = {
                        bids: symbolData.bids || [],
                        asks: symbolData.asks || [],
                      };
                      callback(depthData);
                    } else if (channelType === "market/tickers") {
                      const tickerData: Ticker = {
                        symbol,
                        ...symbolData,
                      };
                      callback(tickerData);
                    } else {
                      // Generic handler for other channels
                      callback(symbolData);
                    }
                  }
                });
              });
            }
          });
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.ws.onclose = () => {
      console.log("WebSocket disconnected");
      this.initialized = false;
    };
  }

  /**
   * Subscribe to a channel for a specific symbol
   * @param channel - Channel name (e.g., "market/tickers", "market/orderbooks-v2")
   * @param symbol - Symbol to subscribe to (e.g., "BTCUSDT.PERP")
   */
  subscribe(channel: ChannelType, symbol: string) {
    // Track subscriptions
    if (!this.subscribedChannels.has(channel)) {
      this.subscribedChannels.set(channel, new Set());
    }
    this.subscribedChannels.get(channel)!.add(symbol);

    // Build subscription message in Flipster format
    const subscriptionMessage: FlipsterSubscription = {
      s: {
        [channel]: {
          rows: [symbol],
          subAccountIds: [],
        },
      },
    };

    if (!this.initialized) {
      this.bufferedMessages.push(subscriptionMessage);
      return;
    }

    this.ws.send(JSON.stringify(subscriptionMessage));
    console.log(`Subscribed to ${channel} for ${symbol}`);
  }

  /**
   * Subscribe to multiple channels for a symbol at once
   * @param channels - Array of channel names
   * @param symbol - Symbol to subscribe to
   */
  subscribeMultiple(channels: ChannelType[], symbol: string) {
    const subscriptionMessage: FlipsterSubscription = {
      s: {},
    };

    channels.forEach((channel) => {
      if (!this.subscribedChannels.has(channel)) {
        this.subscribedChannels.set(channel, new Set());
      }
      this.subscribedChannels.get(channel)!.add(symbol);

      subscriptionMessage.s[channel] = {
        rows: [symbol],
        subAccountIds: [],
      };
    });

    if (!this.initialized) {
      this.bufferedMessages.push(subscriptionMessage);
      return;
    }

    this.ws.send(JSON.stringify(subscriptionMessage));
    console.log(`Subscribed to multiple channels for ${symbol}`, channels);
  }

  async registerCallback<T>(
    type: ChannelType,
    callback: (data: T) => void,
    symbol: string,
  ) {
    if (!this.callbacks[type]) {
      this.callbacks[type] = [];
    }
    // Use symbol as the channel identifier
    this.callbacks[type].push({ callback: callback as any, channel: symbol });
  }

  async deRegisterCallback(type: ChannelType, symbol: string) {
    if (this.callbacks[type]) {
      const index = this.callbacks[type].findIndex(
        (callback) => callback.channel === symbol,
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}
