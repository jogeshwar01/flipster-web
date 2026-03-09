import { useContext, useState } from "react";
import { TradesContext } from "../../state/TradesProvider";
import SelectTickerTable from "./SelectTickerTable";
import DropdownArrow from "../icons/DropdownArrow";

function MarketButton() {
  const { ticker } = useContext(TradesContext);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const toggleSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  return (
    <div className="relative h-full bg-container-bg border-container-border border-0 rounded-xl flex flex-col justify-center">
      <button
        className="z-40 change-market-inner rounded-l-xl h-full flex flex-fill flex-row w-full items-center justify-between bg-container-bg text-text-default border-container-border group hover:cursor-pointer hover:bg-container-bg-hover sm:p-2 border border-r-0"
        aria-expanded={isSelectOpen}
        aria-haspopup="dialog"
        id="marketSelector"
        onClick={toggleSelect}
      >
        <div className="flex flex-row items-center justify-between w-full asset-dropdown-header flex-fill xs:px-4 sm:px-2 sm:pr-0">
          <div className="flex items-center gap-2">
            <img
              className="w-[24px] h-[24px]"
              width="24"
              height="24"
              alt={`${ticker?.symbol} icon`}
              src={`https://flipsterstatic.com/images/wallet/logo/${ticker?.symbol
                ?.split("USDT")[0]
                ?.toLowerCase()}.svg`}
            />
            <div className="flex items-center flex-col">
              <span className="text-text-default text-[16px] font-normal whitespace-nowrap">
                {ticker?.symbol?.split("USDT")[0]}
              </span>
              <span className="px-1.5 py-0.5 text-[11px] font-medium border-[#1a1a1a] text-text-label border rounded-lg">
                Perp
              </span>
            </div>
          </div>
          <span className="flex items-center text-xs ml-6 text-text-label">
            <span
              role="img"
              aria-hidden="true"
              className={`${
                isSelectOpen ? "" : "rotate-180"
              } mx-1 transition-all`}
              style={{
                color: "var(--text-emphasis)",
                width: "20px",
                height: "20px",
                display: "inline-flex",
                fontSize: "inherit",
              }}
            >
              <DropdownArrow />
            </span>
          </span>
        </div>
      </button>

      {isSelectOpen && (
        <div className="absolute left-0 top-full mt-1 z-[100]">
          <SelectTickerTable setIsSelectOpen={setIsSelectOpen} />
        </div>
      )}
    </div>
  );
}

export default MarketButton;
