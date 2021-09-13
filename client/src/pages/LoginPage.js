import Input from "../components/core/Input";
import Button from "../components/core/Button";

function LoginPage() {
  return (
    <>
      <div className="w-full max-w-md px-8 pt-6 pb-8 mx-auto bg-gray-700 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" for="email">
            Email Address
          </label>
          <Input type="text" />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold" for="email">
            Password
          </label>
          <Input type="password" />
        </div>
        <div className="flex">
          <div className="w-auto mb-4">
            <Button>Login</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
