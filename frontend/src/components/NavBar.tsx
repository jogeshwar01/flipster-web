import DropdownArrow from "./icons/DropdownArrow";

// Define navigation items matching Flipster UI
const navigationItems = [
  { id: "trade", label: "Trade", hasDropdown: true },
  { id: "market", label: "Market", hasDropdown: false },
  { id: "copy", label: "Copy", hasDropdown: false },
  { id: "earn", label: "Earn", hasDropdown: true },
  { id: "more", label: "More", hasDropdown: true },
];

function NavBar() {
  return (
    <nav
      id="topbar"
      className="flex flex-grow px-2 sm:px-8 h-[60px] sm:border-none bg-container-bg border-b border-container-border"
    >
      <div className="flex justify-between items-center top-0 left-0 w-full font-display">
        <div className="flex justify-between items-center md:space-x-4">
          <a className="mr-6 hover:cursor-pointer flex items-center gap-2">
            <div className="w-full h-full">
              <img
                className="min-w-[100px] h-[24px]"
                src="/flipster-logo.svg"
                alt="Flipster"
              />
            </div>
          </a>

          <div data-puppet-tag="desktop_navigation" className="flex gap-2">
            {navigationItems.map((item) => (
              <div key={item.id} className="undefined" aria-expanded="false">
                <div
                  id={`desktop_navigation_category_${item.id}`}
                  className={`h-full flex items-center whitespace-nowrap self-center px-3 py-1.5 hover:cursor-pointer rounded hover:brightness-125 select-none text-text-default font-semibold `}
                >
                  <span className="flex items-center gap-1 pointer-events-none">
                    <span className=" text-[14px] leading-[16px]">
                      {item.label}
                    </span>
                    {item.hasDropdown && (
                      <DropdownArrow className="rotate-180 w-3 transition-all" />
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {/* Spring Battle Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded  cursor-pointer hover:brightness-125">
            <img
              src="/spring-battle-icon.webp"
              alt="Spring Battle"
              className="w-4 h-4"
            />
            <span className="text-[14px] text-text-default font-semibold">
              Spring Battle
            </span>
          </div>
        </div>
        <div className="flex items-center h-full space-x-3 flex-fill max-h-[32px]">
          {/* Icons */}
          <button className="p-2 rounded bg-[#262626]">
            <img src="/gift.svg" alt="gift" className="w-5 h-5" />
          </button>

          <button className="p-2 rounded bg-[#262626]">
            <img src="/globe.svg" alt="Globe" className="w-5 h-5" />
          </button>

          <button className="px-6 py-2 rounded-lg border-[#404040] text-text-default text-[14px] font-semibold hover:brightness-125 border ">
            Log in
          </button>

          <button className="px-6 py-2 rounded bg-blue-600 text-white text-[14px] font-semibold hover:brightness-110 ">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
