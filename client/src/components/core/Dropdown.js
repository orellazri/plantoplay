import { ChevronDownIcon } from "@heroicons/react/outline";
import "./Dropdown.css";
import Link from "./Link";

function Dropdown({ title, items }) {
  return (
    <div>
      <div className="relative inline-block text-left dropdown">
        <button
          className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out hover:text-gray-200 focus:outline-none active:bg-gray-50 active:text-gray-800"
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
          aria-controls="headlessui-menu-items-117"
        >
          <span>{title}</span>
          <ChevronDownIcon className="w-4 h-4 ml-2 -mr-1" />
        </button>

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
                  <div className="flex items-center">
                    {item.icon}
                    <span className="pl-2">{item.name}</span>
                  </div>
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
