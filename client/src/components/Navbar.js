import Button from "./core/Button";
import Link from "./core/Link";

function Navbar() {
  return (
    <div className="p-4 bg-gray-800">
      <div className="flex mx-auto space-x max-w-7xl">
        <div className="flex-1 mx-auto">
          <Link to="/">
            <img src="logo-dpad.png" className="w-10" alt="Plan to Play Logo" />
          </Link>
        </div>
        <div className="flex flex-row space-x-4">
          <Button to="/login">Login</Button>
          <Button to="/register" outline>
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
