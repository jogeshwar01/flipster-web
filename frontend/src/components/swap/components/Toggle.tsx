import React from "react";

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label?: string;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange, label }) => {
  return (
    <div className="flex items-center">
      {label && <span className="mr-1">{label}</span>}
      <span className="inline-flex overflow-hidden border rounded-full border-container-border">
        <span className="bg-button-secondary-bg relative inline-flex flex-shrink-0 h-4 w-8 hover:cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none">
          <button
            type="button"
            className="relative inline-flex flex-shrink-0 h-4 w-8 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none hover:cursor-pointer"
            role="switch"
            aria-checked={enabled}
            onClick={onChange}
          >
            <span className="sr-only">{label}</span>
            <span
              aria-hidden="true"
              className={`${
                enabled ? "translate-x-4" : "translate-x-0"
              } bg-text-emphasis absolute pointer-events-none inline-block h-3 w-3 rounded-full shadow transform ring-0 transition ease-in-out duration-200`}
            ></span>
          </button>
        </span>
      </span>
    </div>
  );
};

export default Toggle;
