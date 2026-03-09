import React from "react";

interface OrderTypeTabProps {
  type: "market" | "limit" | "trigger";
  isActive: boolean;
  onClick: () => void;
}

const OrderTypeTab: React.FC<OrderTypeTabProps> = ({
  type,
  isActive,
  onClick,
}) => {
  // Base classes for all tabs
  const baseClasses =
    "py-3 text-base flex relative hover:cursor-pointer flex-1 text-center items-center justify-center hover:bg-container-bg-hover";

  const additionalClasses = isActive ? "text-white" : "text-text-label";

  const typeLabels = {
    market: "Market",
    limit: "Limit",
    trigger: "Trigger",
  };

  const content = (
    <>
      <span className="flex items-center justify-center font-medium text-[15px]">
        {typeLabels[type]}
      </span>
      {isActive && (
        <div className="absolute left-0 bottom-0 h-0.5 w-full z-10 bg-white"></div>
      )}
    </>
  );

  return (
    <div className={`${baseClasses} ${additionalClasses}`} onClick={onClick}>
      {content}
    </div>
  );
};

export default OrderTypeTab;
