import { useContext, useEffect, useState } from "react";
import { TradesContext } from "../../state/TradesProvider";
import MarketStatItem from "./MarketStatItem";

function MarketStats() {
  const { ticker } = useContext(TradesContext);
  const isPositiveChange = parseFloat(ticker?.priceChangePct24h || "0") >= 0;
  const [fundingCountdown, setFundingCountdown] = useState("");

  // Format number with commas
  const formatNumber = (
    value: string | undefined,
    decimals: number = 2,
  ): string => {
    if (!value) return "0";
    const num = parseFloat(value);
    return num.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  // Format large numbers with M suffix
  const formatLargeNumber = (value: string | undefined): string => {
    if (!value) return "0";
    const num = parseFloat(value);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    }
    return num.toFixed(2);
  };

  // Funding countdown timer
  useEffect(() => {
    const updateCountdown = () => {
      if (!ticker?.fundingTime) {
        setFundingCountdown("--:--:--");
        return;
      }

      // Parse the fundingTime - it should be in milliseconds
      const fundingTimeMs = parseInt(ticker.fundingTime);

      // Get current time in milliseconds
      const now = Date.now();

      // Calculate difference in milliseconds
      let diffMs = fundingTimeMs - now;

      // If the timestamp seems to be in seconds, convert it
      if (fundingTimeMs < 10000000000) {
        diffMs = fundingTimeMs * 1000 - now;
      }

      // If diff is negative or zero, funding has passed
      if (diffMs <= 0) {
        setFundingCountdown("00:00:00");
        return;
      }

      // Convert to total seconds
      const totalSeconds = Math.floor(diffMs / 1000);

      // Calculate hours, minutes, seconds
      const hours = Math.floor(totalSeconds / 3600) % 24;
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      // Format as HH:MM:SS
      const formatted = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      setFundingCountdown(formatted);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [ticker]);

  return (
    <div className="relative flex items-center justify-center w-full border-y sm:border border-container-border bg-container-bg h-full hidden-scroll sm:thin-scroll rounded-r-xl overflow-x-auto">
      <div className="flex items-stretch w-full justify-between sm:justify-start font-display sm:divide-x divide-container-border whitespace-nowrap">
        {/* Price with Change */}
        <div className="flex flex-col items-center justify-between px-4 py-2 space-x-2 xl:px-4 sm:py-0">
          <div className="outline-none focus:outline-none flex mr-0 sm:mr-0">
            <div className="flex flex-col">
              <div
                className="overflow-hidden text-xl font-numeral"
                style={{ color: isPositiveChange ? "#34c759" : "#ff3b30" }}
              >
                <span>{formatNumber(ticker?.markPrice, 2)}</span>
              </div>
            </div>
          </div>
          <div className="outline-none focus:outline-none flex ml-2 sm:mr-0">
            <div className="flex flex-col">
              <div className="block overflow-hidden">
                <span
                  className="font-[300] text-[13px] leading-[16px]"
                  style={{ color: isPositiveChange ? "#34c759" : "#ff3b30" }}
                >
                  {isPositiveChange ? "+" : ""}
                  {ticker?.priceChange24h
                    ? parseFloat(ticker.priceChange24h).toFixed(1)
                    : "0"}{" "}
                  {isPositiveChange ? "+" : ""}
                  {ticker?.priceChangePct24h
                    ? parseFloat(ticker.priceChangePct24h).toFixed(2)
                    : "0"}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mark */}
        <MarketStatItem label="Mark">
          <span className="font-[300] text-[13px] leading-[16px] text-text-default">
            {formatNumber(ticker?.markPrice, 1)}
          </span>
        </MarketStatItem>

        {/* Index */}
        <MarketStatItem label="Index">
          <span className="font-[300] text-[13px] leading-[16px] text-text-default">
            {formatNumber(ticker?.indexPrice, 1)}
          </span>
        </MarketStatItem>

        {/* Funding/8h */}
        <MarketStatItem label="Funding/8h">
          <div className="flex items-center space-x-2">
            <span className="font-[300] text-[13px] leading-[16px] text-text-default">
              {ticker?.fundingRate
                ? (parseFloat(ticker.fundingRate) * 100).toFixed(4)
                : "0.0000"}
              %
            </span>
            <span className="font-[300] text-[12px] leading-[14px] text-text-label">
              {fundingCountdown}
            </span>
          </div>
        </MarketStatItem>

        {/* 24h high */}
        <MarketStatItem label="24h high">
          <span className="font-[300] text-[13px] leading-[16px] text-text-default">
            {formatNumber(ticker?.high24h, 1)}
          </span>
        </MarketStatItem>

        {/* 24h low */}
        <MarketStatItem label="24h low">
          <span className="font-[300] text-[13px] leading-[16px] text-text-default">
            {formatNumber(ticker?.low24h, 1)}
          </span>
        </MarketStatItem>

        {/* 24h volume(BTC) */}
        <MarketStatItem
          label={`24h volume(${ticker?.symbol?.split("USDT")[0] || "BTC"})`}
        >
          <span className="font-[300] text-[13px] leading-[16px] text-text-default">
            {formatNumber(ticker?.volume24h, 2)}
          </span>
        </MarketStatItem>

        {/* 24h turnover(USDT) */}
        <MarketStatItem label="24h turnover(USDT)">
          <span className="font-[300] text-[13px] leading-[16px] text-text-default">
            {formatLargeNumber(ticker?.turnover24h)}
          </span>
        </MarketStatItem>
      </div>
    </div>
  );
}

export default MarketStats;
