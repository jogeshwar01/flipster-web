import React, { ReactNode } from "react";

interface InfoRowProps {
  label: ReactNode;
  value: string | ReactNode;
  labelClassName?: string;
  valueClassName?: string;
}

const InfoRow: React.FC<InfoRowProps> = ({
  label,
  value,
  labelClassName = "text-text-secondary shrink-0",
  valueClassName = "text-text-default",
}) => {
  return (
    <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px] flex items-center justify-between w-full">
      <div className={labelClassName}>{label}</div>
      <div className={valueClassName}>
        {typeof value === "string" ? (
          <span className="font-[300] text-[12px] leading-[14px] tracking-[0.15px]">
            {value}
          </span>
        ) : (
          value
        )}
      </div>
    </span>
  );
};

export default InfoRow;
