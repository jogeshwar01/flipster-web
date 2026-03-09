import { useContext, useMemo } from "react";
import { TradesContext } from "../../../state/TradesProvider";

export const OrderBook = () => {
  const { bids, asks, totalBidSize, totalAskSize } = useContext(TradesContext);

  // Format number with K or M suffix
  const formatNumber = (value: number): string => {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(2) + "M";
    } else if (value >= 1000) {
      return (value / 1000).toFixed(2) + "K";
    }
    return value.toFixed(2);
  };

  const calculateCumulativeWidth = (
    cumulativeSize: number,
    totalSize: number,
  ): string => {
    return totalSize ? `${(cumulativeSize * 100) / totalSize}%` : "0%";
  };

  // Calculate the highest bid and lowest ask, and then calculate the spread
  const { highestBid, lowestAsk } = useMemo(() => {
    const highestBid = bids && bids[0] ? parseFloat(bids[0][0]) : 0;
    const lowestAsk = asks && asks[0] ? parseFloat(asks[0][0]) : 0;
    return { highestBid, lowestAsk };
  }, [bids, asks]);

  // Display logic - centered around the spread
  const ordersToShow = 10; // Show 10 orders on each side

  // Process asks and bids for display
  const processedAsks = asks?.slice(0, ordersToShow) || [];
  const processedBids = bids?.slice(0, ordersToShow) || [];

  // Cumulative calculation for bids and asks
  let cumulativeBidSize = 0;
  let cumulativeAskSize = 0;

  return (
    <div className="h-full flex flex-col">
      {/* Orderbook Title */}
      <div className="px-2 py-2 border-b border-container-border">
        <h3 className="text-white font-bold text-xl">Order book</h3>
      </div>

      <div className="flex justify-between text-xs px-2 py-1 text-text-label">
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-left">
          Price (USDT)
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-right">
          Size (USDT)
        </span>
        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-right">
          Sum (USDT)
        </span>
      </div>

      <div className="flex-grow flex flex-col relative">
        <div className="absolute inset-0 w-full h-full overflow-auto thin-scroll flex flex-col">
          {/* Asks (sell orders) */}
          <div data-puppet-tag="sell" className="flex flex-col-reverse w-full">
            {processedAsks.map((order, index) => {
              const price = parseFloat(order[0]);
              const size = parseFloat(order[1]);
              const sizeInUsdt = size * price;
              cumulativeAskSize += sizeInUsdt;

              return (
                <div
                  key={index}
                  className="relative w-full mb-[1px] transition-all duration-300 ease-in-out"
                >
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display mr-0">
                    <div className="flex flex-row mx-2 justify-between w-full">
                      <div
                        className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 transition-colors duration-200"
                        style={{ color: "#ff3b30" }}
                      >
                        {price.toFixed(1)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-white hover:brightness-125 hover:cursor-pointer items-center inline-flex transition-opacity duration-200">
                        {formatNumber(sizeInUsdt)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-white hover:brightness-125 hover:cursor-pointer items-center inline-flex transition-opacity duration-200">
                        {formatNumber(cumulativeAskSize)}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-end">
                      <div
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                          backgroundColor: "#ff3b30",
                          width: calculateCumulativeWidth(
                            cumulativeAskSize,
                            totalAskSize,
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Spread indicator */}
          <div className="w-full px-2 inline-flex justify-between items-center py-2 min-h-[32px] space-x-2  hover:cursor-pointer text-text-default">
            <div className="flex items-center space-x-2">
              <div className="outline-none focus:outline-none flex">
                <div className="flex items-center gap-1">
                  <span
                    className="font-medium text-[16px] leading-[20px] transition-colors duration-300"
                    style={{
                      color: lowestAsk > highestBid ? "#34c759" : "#ff3b30",
                    }}
                  >
                    {lowestAsk.toFixed(1)}
                  </span>
                  {lowestAsk > highestBid && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-opacity duration-300"
                    >
                      <path d="M8 3L12 8H9V13H7V8H4L8 3Z" fill="#34c759" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="outline-none focus:outline-none flex">
                <div className="flex flex-col">
                  <span className="font-[300] text-[13px] leading-[16px] tracking-[0.15px] text-text-label transition-opacity duration-200">
                    {highestBid.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Bids (buy orders) */}
          <div data-puppet-tag="buy" className="flex flex-col w-full">
            {processedBids.map((order, index) => {
              const price = parseFloat(order[0]);
              const size = parseFloat(order[1]);
              const sizeInUsdt = size * price;
              cumulativeBidSize += sizeInUsdt;

              return (
                <div
                  key={index}
                  className="relative w-full mb-[1px] transition-all duration-300 ease-in-out"
                >
                  <div className="w-full h-6 flex relative box-border text-xs leading-7 justify-between font-display ml-0">
                    <div className="flex flex-row mx-2 justify-between w-full">
                      <div
                        className="z-10 hover:brightness-125 hover:cursor-pointer text-xs leading-6 transition-colors duration-200"
                        style={{ color: "#34c759" }}
                      >
                        {price.toFixed(1)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-white hover:brightness-125 hover:cursor-pointer items-center inline-flex transition-opacity duration-200">
                        {formatNumber(sizeInUsdt)}
                      </div>
                      <div className="z-10 text-xs leading-6 text-white hover:brightness-125 hover:cursor-pointer items-center inline-flex transition-opacity duration-200">
                        {formatNumber(cumulativeBidSize)}
                      </div>
                    </div>
                    <div className="absolute opacity-20 w-full h-full flex justify-end">
                      <div
                        className="h-full transition-all duration-500 ease-out"
                        style={{
                          backgroundColor: "#34c759",
                          width: calculateCumulativeWidth(
                            cumulativeBidSize,
                            totalBidSize,
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
