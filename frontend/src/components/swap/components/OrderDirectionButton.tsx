import React from "react";

interface OrderDirectionButtonProps {
  type: "long" | "short";
  isActive: boolean;
  onClick: () => void;
}

const OrderDirectionButton: React.FC<OrderDirectionButtonProps> = ({
  type,
  isActive,
  onClick,
}) => {
  const longButtonClasses = isActive
    ? "flex items-center justify-center flex-1 h-full cursor-pointer border rounded-l-sm bg-positive-green hover:bg-positive-green-hover border-positive-green text-black"
    : "flex items-center justify-center flex-1 h-full cursor-pointer border border-container-border rounded-l-sm text-positive-green-button";

  const shortButtonClasses = isActive
    ? "flex items-center justify-center flex-1 h-full cursor-pointer border rounded-r-sm bg-negative-red hover:bg-negative-red-hover border-negative-red text-black"
    : "flex items-center justify-center flex-1 h-full cursor-pointer border border-container-border rounded-r-sm text-negative-red";

  return (
    <button
      className={type === "long" ? longButtonClasses : shortButtonClasses}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <span>{type === "long" ? "Long" : "Short"}</span>
    </button>
  );
};

export default OrderDirectionButton;
