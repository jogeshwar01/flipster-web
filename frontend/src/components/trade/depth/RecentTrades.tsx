import { useContext } from "react";
import { TradesContext } from "../../../state/TradesProvider";

export const RecentTrades = () => {
  const { trades } = useContext(TradesContext);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Recent Trades Header */}
      <div className="flex justify-between text-xs px-2 py-1 text-text-tertiary">
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-center">
          Price
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-left">
          Size
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-right">
          Time
        </span>
      </div>

      {/* Scrollable Trades Data */}
      <div
        className="flex-grow overflow-y-auto thin-scroll"
        style={{
          scrollbarWidth: "none" /* For Firefox */,
          msOverflowStyle: "none" /* For Internet Explorer and Edge */,
        }}
      >
        {trades.map((trade, index) => {
          const isPositive = parseFloat(trade.qty) > 0;

          return (
            <div key={index} className="relative w-full mb-[1px]">
              <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display px-2 hover:bg-container-bg-hover">
                <div
                  className={`z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 ${
                    isPositive
                      ? "text-text-positive-green-button"
                      : "text-text-negative-red-button"
                  }`}
                >
                  {trade.price}
                </div>
                <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                  {isPositive
                    ? trade.qty
                    : (parseFloat(trade.qty) * -1).toString()}
                </div>
                <div className="z-10 text-xs leading-6 text-static-default hover:brightness-125 hover:cursor-pointer items-center inline-flex">
                  {formatTime(trade.time)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
