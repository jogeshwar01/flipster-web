import React from "react";

interface InfoIconProps {
  className?: string;
  color?: string;
  width?: string;
  height?: string;
}

export const InfoIcon: React.FC<InfoIconProps> = ({
  className,
  color = "currentColor",
  width = "18px",
  height = "18px",
}) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ width, height, display: "inline-flex", fontSize: "inherit" }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 3.75a8.25 8.25 0 100 16.5 8.25 8.25 0 000-16.5zM2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 7.65a.75.75 0 01.75.75v.1a.75.75 0 01-1.5 0v-.1a.75.75 0 01.75-.75zm0 3a.75.75 0 01.75.75v5a.75.75 0 01-1.5 0v-5a.75.75 0 01.75-.75z"
        fill={color}
      />
    </svg>
  );
};
