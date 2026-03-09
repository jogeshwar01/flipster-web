import { useContext } from "react";
import { TradesContext } from "../state/TradesProvider";
import { FavouriteIcon } from "./icons/FavouriteIcon";

export default function FavouritesBar() {
  const { tickers } = useContext(TradesContext);

  const favoritePairs = [
    "SOLUSDT.PERP",
    "BTCUSDT.PERP",
    "ETHUSDT.PERP",
    "DOGEUSDT.PERP",
    "ADAUSDT.PERP",
    "XRPUSDT.PERP",
    "BNBUSDT.PERP",
    "LINKUSDT.PERP",
  ];

  return (
    <div className="px-4 py-1">
      <div className="relative h-8 overflow-visible border-none bg-container-bg">
        <div className="relative z-50 w-full overflow-hidden border rounded border-container-border">
          <div className="flex w-full">
            {favoritePairs.map((pair) => {
              const ticker = tickers.find((t) => t.symbol === pair);
              const isNegative =
                parseFloat(ticker?.priceChangePct24h ?? "0") < 0;
              const baseCurrency = pair.split("USDT")[0].toLowerCase();
              const iconSrc = `https://flipsterstatic.com/images/wallet/logo/${baseCurrency}.svg`;

              return (
                <div key={pair} className="relative z-50">
                  <div className="relative css-62jl8b">
                    <div
                      className="bg-container-bg hover:bg-container-bg-hover relative select-none max-h-[28px] py-2 flex items-center text-md space-x-2 hover:cursor-pointer pl-4 pr-2 justify-center text-text-label"
                      style={{ flexShrink: 0 }}
                    >
                      <div className="relative w-[18px]">
                        <img
                          className="h-[18px] w-[18px]"
                          width="18"
                          height="18"
                          alt={`${baseCurrency.toUpperCase()} icon`}
                          src={iconSrc}
                        />
                        <div className="absolute flex items-start -bottom-1 -translate-x-[6px] flex-shrink-0">
                          <div
                            style={{
                              zIndex: 0,
                              right: 0,
                              position: "relative",
                            }}
                          >
                            <div
                              className="flex items-center justify-center border rounded-full border-container-border bg-container-border"
                              title="Market is favourited"
                              style={{ width: 12, height: 12 }}
                            >
                              <span
                                style={{
                                  color: "rgb(242, 201, 76)",
                                  width: 12,
                                  height: 12,
                                  display: "inline-flex",
                                  fontSize: "inherit",
                                }}
                              >
                                <FavouriteIcon />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-0.5">
                        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                          {baseCurrency.toUpperCase()}
                        </span>
                      </div>
                      <div className="mt-0.5 min-w-[50px]">
                        <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                          <div>
                            <span
                              className={
                                isNegative
                                  ? "text-negative-red flex items-center"
                                  : "text-positive-green flex items-center"
                              }
                            >
                              {isNegative ? "-" : "+"}
                              {Math.abs(
                                parseFloat(ticker?.priceChangePct24h ?? "0"),
                              ).toFixed(2)}
                              %
                            </span>
                          </div>
                        </span>
                      </div>
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
}
