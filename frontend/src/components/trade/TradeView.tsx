import { useCallback, useContext, useEffect, useRef } from "react";
import { ChartManager } from "../../utils/chart_manager";
import { getKlines } from "../../services/api";
import { KLine } from "../../utils/types";
import { TradesContext } from "../../state/TradesProvider";

export const TradeView = ({ market }: { market: string }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);

  const { ticker } = useContext(TradesContext);

  const fetchKlineData = useCallback(async () => {
    let klineData: KLine[] = [];
    try {
      // Backend calculates optimal fixed windows automatically
      // Just pass the symbol and interval (hardcoded to 1D for now)
      klineData = await getKlines(market, "1440");
    } catch (e) {
      console.error("Error fetching Kline data:", e);
    }

    if (chartRef.current && klineData.length > 0) {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy(); // Destroy existing chart instance
      }

      const cleanedKlineData = klineData
        .map((x) => ({
          close: parseFloat(x.close),
          high: parseFloat(x.high),
          low: parseFloat(x.low),
          open: parseFloat(x.open),
          timestamp: x.start, // Use start timestamp
        }))
        .sort((x, y) => (x.timestamp > y.timestamp ? 1 : -1));

      // Initialize a new ChartManager
      const chartManager = new ChartManager(
        chartRef.current,
        cleanedKlineData,
        {
          background: "#111",
          color: "white",
        },
      );

      chartManagerRef.current = chartManager; // Assign the new chart manager instance
    }
  }, [market]);

  useEffect(() => {
    // Fetch initial Kline data
    async function getKlineData() {
      await fetchKlineData();
    }

    getKlineData();

    // Cleanup the chart on unmount
    return () => {
      if (chartManagerRef.current) {
        chartManagerRef.current.destroy();
        chartManagerRef.current = null; // Ensure the reference is cleared after destruction
      }
    };
  }, [fetchKlineData, market]);

  return (
    <div className="h-full min-h-[450px] bg-container-bg overflow-hidden w-full flex flex-col border-container-border rounded-xl border">
      <div className="w-full flex items-center border-b border-container-border">
        <div className="flex">
          <div className="px-4 py-2 text-lg font-bold text-white border-b-2 border-white cursor-pointer">
            Chart
          </div>
          <div className="px-4 py-2 text-lg text-text-label border-b-2 border-transparent opacity-50 cursor-not-allowed">
            Info
          </div>
        </div>
      </div>

      <div className="w-full py-2 px-3 flex items-center relative justify-between leading-[16px] text-text-emphasis">
        <div className="text-lg font-semibold">
          {ticker?.symbol ? `${ticker?.symbol?.split(".")?.[0]}` : ""}
        </div>
        <div className="text-right my-1">
          <div className="font-semibold text-xs">Trading View</div>
        </div>
      </div>

      <div className="flex-grow">
        <div ref={chartRef} className="w-full h-full"></div>
      </div>
    </div>
  );
};
