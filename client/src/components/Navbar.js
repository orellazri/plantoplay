import Button from "./core/Button";
import Link from "./core/Link";

function Navbar() {
  return (
    <div className="flex bg-gray-800 p-4 space-x">
      <div className="flex-1">
        <Link to="/">
          <img src="logo-dpad.png" className="w-10" />
        </Link>
      </div>
      <div className="flex-none">
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
