import "./Dropdown.css";

import Link from "./Link";

function Dropdown({ title, items }) {
  return (
    <div>
      <div className="relative inline-block text-left dropdown">
        <span className="rounded-md shadow-sm">
          <button
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:text-gray-200 focus:outline-none active:bg-gray-50 active:text-gray-800"
            type="button"
            aria-haspopup="true"
            aria-expanded="true"
            aria-controls="headlessui-menu-items-117"
          >
            <span>{title}</span>
            <svg className="w-5 h-5 ml-2 -mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </span>
        <div className="invisible transition-all duration-300 origin-top-right transform scale-95 -translate-y-2 opacity-0 dropdown-menu">
          <div
            className="absolute right-0 w-56 mt-2 origin-top-right bg-gray-600 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            role="menu"
          >
            <div className="py-1">
              {items.map((item, i) => (
                <Link
                  className="flex justify-between w-full px-4 py-2 text-sm text-left text-gray-100 hover:bg-gray-500"
                  onClick={item.onClick}
                  to={item.to}
                  key={i}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
