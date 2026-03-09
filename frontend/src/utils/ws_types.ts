import { Ticker } from "./types";

export type DepthData = {
  bids: [string, string][];
  asks: [string, string][];
};

export type MessageCallback<T> = {
  callback: (data: T) => void;
  channel: string;
};

// Flipster WebSocket subscription message format
export type FlipsterSubscription = {
  s: {
    [channel: string]: {
      rows: string[]; // Array of symbols to subscribe to
      subAccountIds: string[]; // Empty for public data
    };
  };
};

// Flipster WebSocket response format
export type FlipsterWsResponse = {
  t?: {
    [channel: string]: {
      s?: {
        [symbol: string]: any;
      };
      u?: {
        [symbol: string]: any;
      };
    };
  };
  p?: string; // Sequence ID
};

export type CallbackMap = {
  "market/orderbooks-v2": MessageCallback<DepthData>[];
  "market/tickers": MessageCallback<Ticker>[];
  "market/pswap-details": MessageCallback<any>[];
  [key: string]: MessageCallback<any>[];
};

export type ChannelType =
  | "market/orderbooks-v2"
  | "market/tickers"
  | "market/pswap-details";
