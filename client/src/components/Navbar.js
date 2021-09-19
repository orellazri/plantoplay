import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../utils";
import { LogoutIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Button from "./core/Button";
import Link from "./core/Link";
import Dropdown from "../components/core/Dropdown";
import SearchBar from "./SearchBar";

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  const handleLogout = async () => {
    await logout(dispatch);
  };

  return (
    <div className="p-4 bg-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between">
          {/* Left navigation */}
          <div className="flex w-11/12 md:w-1/2">
            <div className="flex items-center w-full space-x-4 sm:space-x-8">
              {/* Logo */}
              <Link to="/" onClick={() => setMobileMenuShown(false)}>
                <img src="/logo-dpad.png" className="w-10" alt="Plan to Play Logo" />
              </Link>
              {/* Left navigation items */}
              {/* Search */}
              {user.loggedIn && <SearchBar />}
            </div>
          </div>

          {/* Right navigation */}
          {!user.loggedIn && (
            <div className="items-center hidden space-x-3 md:flex">
              <Button to="/login">Login</Button>
              <Button to="/register" outline>
                Sign Up
              </Button>
            </div>
          )}
          {/* User menu */}
          {user.loggedIn && (
            <div className="items-center hidden space-x-3 md:flex">
              <Dropdown
                title={user.user.displayName}
                items={[
                  {
                    name: "Sign out",
                    to: "",
                    onClick: handleLogout,
                    icon: <LogoutIcon className="w-6 h-6" />,
                  },
                ]}
              />
            </div>
          )}

          {/* Mobile button */}
          <div className="flex items-center md:hidden">
            {!mobileMenuShown && <MenuIcon className="w-6 h-6 text-white opacity-80" onClick={() => setMobileMenuShown(true)} />}
            {mobileMenuShown && <XIcon className="w-6 h-6 text-white opacity-80" onClick={() => setMobileMenuShown(false)} />}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuShown && !user.loggedIn && (
        <div className="mt-5">
          <Link to="/login" primary className="block py-2" onClick={() => setMobileMenuShown(false)}>
            Login
          </Link>
          <Link to="/register" primary className="block py-2" onClick={() => setMobileMenuShown(false)}>
            Sign Up
          </Link>
        </div>
      )}
      {mobileMenuShown && user.loggedIn && (
        <div className="mt-5">
          <Link to="#" primary className="block py-2" onClick={handleLogout}>
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
