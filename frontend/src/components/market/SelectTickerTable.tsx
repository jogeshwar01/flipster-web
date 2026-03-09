import { useContext, useState } from "react";
import { TradesContext } from "../../state/TradesProvider";
import { Ticker } from "../../utils/types";
import { useNavigate } from "react-router-dom";

function SelectTickerTable({
  setIsSelectOpen,
}: {
  setIsSelectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { tickers } = useContext(TradesContext);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [activeTab, setActiveTab] = useState("perpetual"); // State for tab selection
  const navigate = useNavigate(); // Initialize the navigate function

  // Featured markets to show at top
  const featuredSymbols = ["BTCUSDT.PERP", "ETHUSDT.PERP", "SOLUSDT.PERP"];

  const tabs = [
    { id: "perpetual", label: "Perpetual" },
    { id: "hot", label: "Hot" },
    { id: "new", label: "New" },
    { id: "favorites", label: "Favorites" },
    { id: "spot", label: "Spot" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query
  };

  const handleSelectTicker = (ticker: Ticker) => {
    setIsSelectOpen(false);
    navigate(`/trade/${ticker.symbol}`); // Navigate to the selected ticker's route
  };

  // Filter the tickers based on the search query
  const allFilteredTickers = tickers
    .filter((ticker) =>
      ticker.symbol?.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => (a.symbol || "").localeCompare(b.symbol || ""));

  // Separate featured and other tickers
  const featuredTickers = searchQuery
    ? []
    : allFilteredTickers.filter((ticker) =>
        featuredSymbols.includes(ticker.symbol!),
      );

  const otherTickers = allFilteredTickers.filter(
    (ticker) => !ticker.symbol || !featuredSymbols.includes(ticker.symbol),
  );

  const filteredTickers = searchQuery
    ? allFilteredTickers
    : [...featuredTickers, ...otherTickers];

  return (
    <div className="w-[480px] bg-container-bg border border-container-border rounded shadow-lg overflow-hidden">
      {/* Search Input */}
      <div className="p-3 border-b border-container-border">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-label"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search selections"
            className="w-full pl-10 pr-3 py-2 bg-main-bg border border-container-border rounded text-text-default text-[13px] placeholder-text-label focus:outline-none focus:border-blue-600"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 px-3 pt-3 pb-2 border-b border-container-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded text-[12px] font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-container-bg-selected text-text-default"
                : "text-text-label hover:text-text-default hover:bg-container-bg-hover"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table Headers */}
      <div className="grid grid-cols-12 gap-2 px-4 py-2 text-[11px] font-medium text-text-label uppercase bg-main-bg border-b border-container-border">
        <div className="col-span-3">24h volume ↓</div>
        <div className="col-span-4 text-right">Price</div>
        <div className="col-span-5 text-right">24h change</div>
      </div>

      {/* Ticker List */}
      <div className="overflow-y-auto max-h-[320px]">
        {filteredTickers.length > 0 ? (
          <>
            {filteredTickers.map((ticker, index) => (
              <div key={ticker.symbol}>
                <div
                  className="grid grid-cols-12 gap-2 px-4 py-2.5 hover:bg-container-bg-hover cursor-pointer group"
                  onClick={() => handleSelectTicker(ticker)}
                >
                  <div className="col-span-3 flex items-center gap-2">
                    <svg
                      className="w-3 h-3 text-text-label group-hover:text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <img
                      className="w-5 h-5"
                      alt={`${ticker.symbol} icon`}
                      src={`https://flipsterstatic.com/images/wallet/logo/${ticker.symbol
                        ?.split("USDT")[0]
                        ?.toLowerCase()}.svg`}
                    />
                    <div className="flex items-center gap-1.5">
                      <span className="text-text-default text-[13px] font-medium">
                        {ticker.symbol?.split("USDT")[0]}
                      </span>
                      <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-[#1a1a1a] text-text-label border border-container-border">
                        Perp
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center justify-end text-[13px] text-text-label">
                    Vol{" "}
                    {ticker.volume24h
                      ? `${(parseFloat(ticker.volume24h) / 1000000).toFixed(1)}M`
                      : "0"}
                  </div>
                  <div className="col-span-3 flex items-center justify-end text-[13px] text-text-default font-medium">
                    {parseFloat(ticker.markPrice).toFixed(1)}
                  </div>
                  <div className="col-span-4 flex items-center justify-end">
                    <span
                      className={`text-[13px] font-medium ${
                        parseFloat(ticker.priceChangePct24h) < 0
                          ? "text-[#ff3b30]"
                          : "text-[#34c759]"
                      }`}
                    >
                      {parseFloat(ticker.priceChangePct24h) < 0 ? "↓" : "↑"}
                      {Math.abs(parseFloat(ticker.priceChangePct24h)).toFixed(
                        2,
                      )}
                      %
                    </span>
                  </div>
                </div>
                {/* Add separator after featured markets */}
                {!searchQuery &&
                  index === featuredTickers.length - 1 &&
                  featuredTickers.length > 0 && (
                    <div className="border-t border-container-border my-1"></div>
                  )}
              </div>
            ))}
          </>
        ) : (
          <div className="px-4 py-8 text-center text-text-label text-[13px]">
            No results found
          </div>
        )}
      </div>
    </div>
  );
}

export default SelectTickerTable;
