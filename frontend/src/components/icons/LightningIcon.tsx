import React from "react";

interface LightningIconProps {
  className?: string;
  width?: string;
  height?: string;
}

export const LightningIcon: React.FC<LightningIconProps> = ({
  className,
  width = "16",
  height = "16",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M4.58215 14.0199C4.48005 14.1334 4.29833 14.0141 4.36178 13.8753L6.87497 8.3777C6.9557 8.20109 6.82663 8.00016 6.63244 8.00016H4.43694C4.23738 8.00016 4.10853 7.789 4.1998 7.61154L7.35409 1.4782C7.39978 1.38935 7.49131 1.3335 7.59123 1.3335H11.182C11.3815 1.3335 11.5104 1.54465 11.4191 1.72212L9.53313 5.38932C9.44186 5.56678 9.57072 5.77794 9.77028 5.77794H11.4012C11.632 5.77794 11.7538 6.05139 11.5994 6.223L4.58215 14.0199Z"
        fill="url(#fill_inactive_medium)"
      />
      <defs>
        <linearGradient
          id="fill_inactive_medium"
          x1="3.81285"
          y1="3.32282"
          x2="12.3673"
          y2="3.9117"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.375" stopColor="var(--text-label)" />
          <stop offset="1" stopColor="var(--text-label)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
