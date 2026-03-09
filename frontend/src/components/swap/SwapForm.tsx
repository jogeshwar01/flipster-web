import React, { useState } from "react";
import "./swapStyles.css";
import OrderTypeTab from "./components/OrderTypeTab";
import InfoRow from "./components/InfoRow";

const SwapForm: React.FC<{ market: string }> = ({ market }) => {
  // State for form values
  const [orderType] = useState<"market" | "limit" | "trigger">("market");

  return (
    <form className="relative flex-1">
      <div className="h-full w-full">
        <div className="relative overflow-hidden h-full">
          <div className="h-full w-full overflow-y-auto">
            <div
              id="trade_form"
              className="relative flex flex-col h-full overflow-auto thin-scroll justify-start"
            >
              <div
                className="flex flex-col h-full justify-start"
                id="trade-form-container"
              >
                {/* Disabled overlay effect */}
                <div className="flex flex-col relative z-10 opacity-40">
                  {/* Order Type Tabs */}
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col justify-start flex-1">
                      <div className="relative w-full">
                        <div className="flex whitespace-nowrap w-full">
                          <OrderTypeTab
                            type="market"
                            isActive={orderType === "market"}
                            onClick={() => {}}
                          />
                          <OrderTypeTab
                            type="limit"
                            isActive={orderType === "limit"}
                            onClick={() => {}}
                          />
                          <OrderTypeTab
                            type="trigger"
                            isActive={orderType === "trigger"}
                            onClick={() => {}}
                          />
                        </div>
                        <div
                          className="w-full absolute inset-x-0 bottom-0 h-[1px] z-0"
                          style={{
                            background:
                              "linear-gradient(to left, rgba(0,0,0,0), var(--container-border))",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <span className="flex-shrink-0 w-full my-2"></span>
                  <div className="p-3">
                    <div>
                      {/* 1. Margin Mode */}
                      <div className="mb-3">
                        <div className="bg-black rounded-sm  py-2 flex items-center justify-between text-text-default h-[40px] border border-container-border cursor-pointer">
                          <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] text-text-default">
                            Margin Mode
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-[14px]">Isolated</span>
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M6 4L10 8L6 12"
                                stroke="var(--text-label)"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* 2. Leverage */}
                      <div className="mb-3">
                        <div className="text-text-default font-normal mb-1">
                          <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                            Leverage
                          </span>
                        </div>
                        <div className="bg-black rounded-sm px-3 py-2 flex items-center justify-between text-text-default h-[40px] border border-container-border cursor-pointer">
                          <span className="text-[14px]">1x</span>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6 4L10 8L6 12"
                              stroke="var(--text-label)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* 3. Position Size */}
                      <div className="mb-3">
                        <div className="text-text-default font-normal mb-1">
                          <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                            Position Size
                          </span>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <div className="bg-black rounded-sm px-3 py-2 flex items-center justify-between text-text-default h-[40px] border border-container-border">
                            <input
                              type="number"
                              value="0.00"
                              disabled
                              className="bg-transparent border-none outline-none text-text-input flex-1 font-numeral"
                              placeholder="0.00"
                            />
                            <span className="text-[14px] text-text-default ml-2">
                              {market?.split("USDT")?.[0] || "BTC"}
                            </span>
                          </div>
                          <div className="bg-black rounded-sm px-3 py-2 flex items-center justify-between text-text-default h-[40px] border border-container-border">
                            <input
                              type="number"
                              value="0.00"
                              disabled
                              className="bg-transparent border-none outline-none text-text-input flex-1 font-numeral"
                              placeholder="0.00"
                            />
                            <span className="text-[14px] text-text-default ml-2">
                              USDT
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 4. Margin */}
                      <div className="mb-3">
                        <div className="text-text-default font-normal mb-1">
                          <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
                            Margin
                          </span>
                        </div>
                        <div className="bg-black rounded-sm px-3 py-2 flex items-center justify-between text-text-default h-[40px] border border-container-border">
                          <span className="text-[14px] text-text-default">
                            0.00 {market?.split("USDT")?.[0] || "BTC"}
                          </span>
                          <span className="text-[14px] text-text-default">
                            0.00 USDT
                          </span>
                        </div>
                      </div>

                      {/* 5. TP/SL Checkbox */}
                      <div className="mb-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-container-border bg-black"
                            disabled
                          />
                          <span className="text-[13px] text-text-default">
                            TP/SL (Take Profit / Stop Loss)
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* 6. Sign up / Login Button - Full opacity */}
                    <button
                      className="w-full mb-4 opacity-100 text-white border border-transparent whitespace-nowrap rounded-md font-display items-center justify-center py-3 text-lg tracking-normal select-none cursor-pointer"
                      type="button"
                    >
                      <span className="font-[400] text-[16px] leading-[-0.25px] flex items-center justify-center whitespace-normal">
                        Sign up / Login to trade
                      </span>
                    </button>

                    {/* Bottom Info Section - Reduced opacity */}
                    <div className="flex flex-col opacity-50">
                      <hr className="mb-3 border-container-border" />

                      {/* 7. Order Value / Max Order Value */}
                      <InfoRow label="Order Value" value="0.00 USDT" />
                      <div className="h-2"></div>
                      <InfoRow label="Max Order Value" value="0.00 USDT" />

                      <div className="h-3"></div>

                      {/* 8. Est Liquidation Price */}
                      <InfoRow
                        label="Est. Liquidation Price"
                        value="0.00 USDT"
                      />

                      <div className="h-3"></div>

                      {/* 9. Trading Fee */}
                      <InfoRow label="Trading Fee" value="0%" />

                      <div className="h-4"></div>

                      {/* 10. Trade Setting Button */}
                      <button
                        type="button"
                        className="w-full py-2 px-3 text-text-default text-[13px] rounded border border-container-border flex items-center justify-center gap-2"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="8" cy="8" r="2" />
                          <path d="M13.5 8h-2M4.5 8h-2M8 4.5v-2M8 13.5v-2" />
                          <path d="M11.5 4.5l-1.4 1.4M5.9 10.1L4.5 11.5M11.5 11.5l-1.4-1.4M5.9 5.9L4.5 4.5" />
                        </svg>
                        <span>Trade Settings</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SwapForm;
