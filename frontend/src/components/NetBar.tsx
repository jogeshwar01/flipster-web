const netBarItems = [
  { label: "Net USD Value" },
  { label: "Acct. Leverage" },
  { label: "Health" },
];

const NetBarItem = ({ label }: { label: string }) => (
  <div className="w-full px-1 my-1">
    <div className="block w-full h-full text-left px-2 py-0.5 leading-5">
      <span className="font-[400] text-[11px] leading-[12px] tracking-[.15px] text-text-label whitespace-nowrap">
        {label}
      </span>
      <br />
      <div className="w-12 h-4 mt-0.5 bg-border-2 rounded"></div>
    </div>
  </div>
);

export const NetBar = () => {
  return (
    <div className="h-full bg-container-bg border-container-border rounded border relative overflow-visible border-none">
      <div className="z-30 flex w-full min-h-full border rounded lg:absolute bg-container-bg border-container-border">
        <div className="w-full">
          <div
            className="flex flex-row items-stretch justify-between text-text-default divide-x divide-container-border"
            id="marginItems"
          >
            {netBarItems.map((item) => (
              <NetBarItem key={item.label} label={item.label} />
            ))}
          </div>
          <div className="p-4 hidden space-y-2"></div>
        </div>
      </div>
    </div>
  );
};
