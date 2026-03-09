import React from "react";
import { DynamicLightningIcon } from "../../icons/DynamicLightningIcon";

interface SlippageButtonProps {
  value: string;
  isSelected: boolean;
  onClick: () => void;
  isLightning?: boolean;
  isInfinity?: boolean;
}

const SlippageButton: React.FC<SlippageButtonProps> = ({
  value,
  isSelected,
  onClick,
  isLightning = false,
  isInfinity = false,
}) => {
  const baseClasses =
    "flex items-center justify-center h-full w-full box-border";
  const selectedClasses = "border-transparent text-text-emphasis";
  const unselectedClasses =
    "border-button-border hover:bg-button-secondary-bg-hover text-text-label";

  const buttonClasses = `${baseClasses} bg-button-secondary-bg hover:border-transparent dark:border disabled:cursor-not-allowed py-[4px] px-[8px] ${
    isSelected ? selectedClasses : unselectedClasses
  } hover:cursor-pointer`;

  return (
    <button
      className={buttonClasses}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {isLightning ? (
        <DynamicLightningIcon width="16px" height="16px" />
      ) : isInfinity ? (
        <span className="text-xl font-numeral">∞</span>
      ) : (
        <span>{value}</span>
      )}
    </button>
  );
};

export default SlippageButton;
