import { useContext, useEffect } from "react";
import { TradesContext } from "../state/TradesProvider";
import MarketButton from "./market/MarketButton";
import MarketStats from "./market/MarketStats";
import { WsManager } from "../utils/ws_manager";
import { Ticker } from "../utils/types";

function MarketBar({ market }: { market: string }) {
  const { setTicker, setTickers } = useContext(TradesContext);

  useEffect(() => {
    // Subscribe to ticker updates for this specific market via WebSocket
    WsManager.getInstance().registerCallback<Ticker>(
      "market/tickers",
      (data: Ticker) => {
        if (data.symbol === market) {
          setTicker(data);
        }
      },
      market,
    );

    // Subscribe to tickers channel for this market
    WsManager.getInstance().subscribe("market/tickers", market);

    return () => {
      WsManager.getInstance().deRegisterCallback("market/tickers", market);
    };
  }, [market, setTicker, setTickers]);

  return (
    <div style={{ gridArea: "1 / 1 / 2 / 3" }}>
      <div className="rounded-lg inline-flex items-center justify-center w-full h-[60px] bg-container-bg thin-scroll">
        <MarketButton />
        <MarketStats />
      </div>
    </div>
  );
}

export default MarketBar;
