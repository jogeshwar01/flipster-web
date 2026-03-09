import { ReactNode } from "react";

interface MarketStatItemProps {
  label: string;
  children: ReactNode;
}

export default function MarketStatItem({
  label,
  children,
}: MarketStatItemProps) {
  return (
    <div className="px-2 xl:px-6 flex flex-col justify-center">
      <div className="outline-none focus:outline-none flex">
        <div className="flex flex-col">
          <span className="font-[400] text-[11px] leading-[12px] tracking-[.15px]">
            <div className="flex flex-col">
              <div className="overflow-hidden text-text-label select-none hover:cursor-default">
                {label}
              </div>
              <span className="flex-shrink-0 w-full pb-xs"></span>
              <div className="flex items-center grow">{children}</div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}
