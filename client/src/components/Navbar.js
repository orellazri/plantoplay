import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../utils";
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
          <div className="flex md:w-1/2">
            <div className="flex items-center w-full space-x-4 sm:space-x-8">
              {/* Logo */}
              <Link to="/" onClick={() => setMobileMenuShown(false)}>
                <img src="logo-dpad.png" className="w-10" alt="Plan to Play Logo" />
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
          {user.loggedIn && (
            <div className="items-center hidden space-x-3 md:flex">
              <Dropdown title={user.user.displayName} items={[{ name: "Sign out", to: "", onClick: handleLogout }]} />
            </div>
          )}

          {/* Mobile button */}
          <div className="flex items-center md:hidden">
            {!mobileMenuShown && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                onClick={() => setMobileMenuShown(true)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
            {mobileMenuShown && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 opacity-80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
                onClick={() => setMobileMenuShown(false)}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
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
          <Link to="" primary className="block py-2" onClick={handleLogout}>
            Sign out
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
