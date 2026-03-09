import { useContext, useEffect } from "react";
import { OrderBook } from "./depth/Orderbook";
import { TradesContext } from "../../state/TradesProvider";
import { WsManager } from "../../utils/ws_manager";
import { DepthData } from "../../utils/ws_types";

export const Depth = ({ market }: { market: string }) => {
  const { setAsks, setBids, setTotalAskSize, setTotalBidSize, ticker } =
    useContext(TradesContext);

  useEffect(() => {
    // Subscribe to orderbook updates for this market
    WsManager.getInstance().registerCallback<DepthData>(
      "market/orderbooks-v2",
      (data: DepthData) => {
        setBids(data.bids);
        setAsks(data.asks);

        // Calculate total sizes in USDT by multiplying quantity by price
        setTotalBidSize(
          data.bids.reduce((acc: number, bid: [string, string]) => {
            const price = parseFloat(bid[0]);
            const size = parseFloat(bid[1]);
            return acc + price * size;
          }, 0),
        );

        setTotalAskSize(
          data.asks.reduce((acc: number, ask: [string, string]) => {
            const price = parseFloat(ask[0]);
            const size = parseFloat(ask[1]);
            return acc + price * size;
          }, 0),
        );
      },
      market,
    );

    // Subscribe to the orderbook channel
    WsManager.getInstance().subscribe("market/orderbooks-v2", market);

    return () => {
      WsManager.getInstance().deRegisterCallback(
        "market/orderbooks-v2",
        market,
      );
    };
  }, [market, setAsks, setBids, setTotalAskSize, setTotalBidSize, ticker]);

  return (
    <div className="h-full min-h-[550px] w-full bg-container-bg border-container-border rounded-xl border overflow-hidden flex">
      <div className="flex flex-col w-full">
        {/* Custom style for WebKit-based browsers to hide scrollbar */}
        <style>{`
          div::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }
        `}</style>

        {/* Orderbook Content */}
        <div className="flex-grow">
          <OrderBook />
        </div>
      </div>
    </div>
  );
};
