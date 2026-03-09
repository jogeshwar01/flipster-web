import React from "react";
import { ArrowDownIcon } from "../../icons/ArrowDownIcon";

interface InputWithCurrencyProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  currencyLogo?: string;
  currencySymbol: string;
  hasDropdown?: boolean;
  className?: string;
}

const InputWithCurrency: React.FC<InputWithCurrencyProps> = ({
  label,
  value,
  onChange,
  placeholder = "0.00",
  disabled = false,
  currencyLogo,
  currencySymbol,
  hasDropdown = false,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <div className="flex justify-between text-text-tertiary">
          <div className="flex pb-0.5">
            <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
              {label}
            </span>
          </div>
        </div>
      )}
      <div className="flex justify-center w-full relative h-8">
        <div className="absolute w-full h-[32px] text-sm inline-flex">
          <input
            className="px-2 pt-0.5 w-full bg-input-bg text-text-input default-transition focus:outline-none border-none h-full font-numeral"
            type="number"
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled}
            style={{ paddingRight: "20px" }}
          />
          <div className="absolute top-0 flex items-center h-full space-x-1 right-3 z-1 select-none">
            <div className="h-[18px] w-[18px] flex items-center">
              {currencyLogo && (
                <img
                  className="h-[18px] w-[18px]"
                  width="18"
                  height="18"
                  alt={`${currencySymbol} icon`}
                  src={currencyLogo}
                />
              )}
              {!currencyLogo && (
                <span className="text-text-secondary">{currencySymbol}</span>
              )}
              {hasDropdown && <ArrowDownIcon color="var(--text-tertiary)" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputWithCurrency;
