import { useEffect, useState } from "react";
import { getWinners } from "../services/api";

interface Winner {
  symbol: string;
  nickname: string;
  pnl: string;
  side: string;
}

function Winners() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [tradeTabText, setTradeTabText] = useState<string>(
    "Traders are earning more 🎯",
  );

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const data = await getWinners();
        if (data && data.winners && data.winners.length > 0) {
          setWinners(data.winners);
          if (data.tradeTabText) {
            setTradeTabText(data.tradeTabText);
          }
          console.log("data", data);
        }
      } catch (error) {
        console.error("Error fetching winners:", error);
      }
    };

    fetchWinners();
    // Refresh every 30 seconds
    const interval = setInterval(fetchWinners, 30000);

    return () => clearInterval(interval);
  }, []);

  // Use placeholder data if no winners loaded yet
  const displayWinners =
    winners.length > 0
      ? winners
      : [
          {
            symbol: "BTCUSDT.PERP",
            nickname: "MAV-bananas",
            pnl: "35798.98",
            side: "Long",
          },
          {
            symbol: "ETHUSDT.PERP",
            nickname: "cracker",
            pnl: "1234.50",
            side: "Long",
          },
          {
            symbol: "SOLUSDT.PERP",
            nickname: "wengraduate",
            pnl: "-456.78",
            side: "Short",
          },
        ];

  // Duplicate the winners array for seamless infinite scroll
  const duplicatedWinners = [
    ...displayWinners,
    ...displayWinners,
    ...displayWinners,
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-[#1a1a1a] border-t border-container-border overflow-hidden h-[48px]">
      <div className="relative w-full h-full flex items-center">
        {/* Label */}
        <div className="absolute left-0 bg-[#1a1a1a] px-4 z-10 flex items-center h-full border-r border-container-border">
          <span className="text-text-default text-[14px] font-medium">
            {tradeTabText}
          </span>
        </div>

        {/* Animated ticker container */}
        <div className="flex animate-scroll-left pl-48">
          {duplicatedWinners.map((winner, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 whitespace-nowrap"
            >
              {/* Icon */}
              <div className="flex items-center gap-1.5">
                <img
                  className="w-4 h-4"
                  alt={winner.symbol}
                  src={`https://flipsterstatic.com/images/wallet/logo/${winner.symbol?.replace(".PERP", "")?.split("USDT")[0]?.toLowerCase()}.svg`}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <span className="text-text-default text-[13px] font-medium">
                  {winner.symbol?.replace(".PERP", "")?.split("USDT")[0] ||
                    "BTC"}
                </span>
              </div>

              {/* Side indicator (Long/Short) */}
              <span
                className={`text-[12px] flex items-center gap-1 ml-2 ${
                  winner.side?.toLowerCase() === "long"
                    ? "text-[#34c759]"
                    : "text-[#ff3b30]"
                }`}
              >
                {winner.side?.toLowerCase() === "long" ? "Long" : "Short"}
              </span>

              {/* Nickname */}
              <span className="text-[12px] text-text-label">
                {winner.nickname}
              </span>

              {/* PnL with color */}
              <span className={`text-[13px] font-medium`}>
                {parseFloat(winner.pnl) >= 0 ? "+" : ""}
                {parseFloat(winner.pnl).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>

              {/* Arrow */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="opacity-50"
              >
                <path
                  d="M4 3L7 6L4 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll-left {
          animation: scroll-left 45s linear infinite;
        }

        .animate-scroll-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default Winners;
