export const OrdersMenu = () => {
  return (
    <div className="bg-container-bg border-border border rounded-lg overflow-visible">
      <div
        className="relative flex flex-col h-full"
        id="tutorial_step_positions_table_highlight"
      >
        <div className="relative w-full">
          <div
            id="trade_page_table_tabs"
            className="relative flex items-center justify-between w-full overflow-auto border-b border-container-border thin-scroll"
          >
            <div className="flex border-b bg-container-bg border-container-border border-none whitespace-nowrap">
              <div className="py-2 px-4 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover leading-3 text-white border-b-2 border-white">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <span className="font-normal text-xl">Your positions</span>
                  </div>
                </div>
              </div>
              <div className="py-2 px-4 flex items-center relative hover:cursor-pointer hover:bg-container-bg-hover text-text-label leading-3 border-b-2 border-transparent">
                <div className="flex items-center w-full">
                  <div className="flex items-center gap-1 mx-auto">
                    <span className="font-normal text-xl">Socials</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overflow-hidden h-[200px]">
          <div
            id="user_balances_portfolio_table"
            className="flex flex-col flex-grow h-full overflow-x-auto thin-scroll"
          >
            <div className="h-full overflow-auto thin-scroll">
              <div className="align-middle inline-block min-w-full h-full">
                <div className="flex flex-col justify-center items-center h-full w-full text-center gap-4">
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-md text-text-default">
                      Log in to view your positions
                    </span>
                    <button className="disabled:cursor-not-allowed bg-white hover:bg-gray-100 text-black font-medium h-[28px] text-lg py-[8px] px-[24px] rounded flex items-center justify-center transition-colors">
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
