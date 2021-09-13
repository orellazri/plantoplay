import { useState } from "react";
import Input from "../components/core/Input";
import Button from "../components/core/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail(email.trim());
    if (!email || !password || password.length <= 5) {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-md px-8 pt-6 pb-8 mx-auto bg-gray-700 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Email Address</label>
          <Input type="email" value={email} required autoFocus onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Password</label>
          <Input type="password" value={password} minLength={5} required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex">
          <div className="w-auto">
            <Button type="submit">Login</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
