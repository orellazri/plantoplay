import axios from "axios";
import { useState } from "react";

import Button from "./core/Button";
import Link from "./core/Link";

function Navbar() {
  const [mobileMenuShown, setMobileMenuShown] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      localStorage.removeItem("tokenInCookies");
    } catch (err) {}
  };

  return (
    <div className="p-4 bg-gray-800">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between">
          <div className="flex">
            {/* Left navigation */}
            <div className="flex space-x-3">
              {/* Logo */}
              <Link to="/" onClick={() => setMobileMenuShown(false)}>
                <img src="logo-dpad.png" className="w-10" alt="Plan to Play Logo" />
              </Link>
              {/* Left navigation items */}
              <button onClick={handleLogout}>logout(temp)</button>
            </div>
          </div>

          {/* Right navigation */}
          <div className="items-center hidden space-x-3 md:flex">
            <Button to="/login">Login</Button>
            <Button to="/register" outline>
              Sign Up
            </Button>
          </div>

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
      {mobileMenuShown && (
        <div className="mt-5">
          <Link to="/login" className="block py-2" onClick={() => setMobileMenuShown(false)}>
            Login
          </Link>
          <Link to="/register" className="block py-2" onClick={() => setMobileMenuShown(false)}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
