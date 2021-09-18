import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { setLoggedIn, setUser } from "../slices/userSlice";
import Input from "../components/core/Input";
import Button from "../components/core/Button";
import Alert from "../components/core/Alert";

function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setEmail(email.trim());
    setDisplayName(displayName.trim());
    if (!email || !password) {
      return;
    }

    if (password !== repeatPassword) {
      setError("The passwords you entered do not match.");
      return;
    }

    try {
      const result = await axios.post("/auth/register", { email, password, display_name: displayName });
      const { data } = result;

      dispatch(setLoggedIn(true));
      dispatch(setUser({ id: data.id, email: data.email, displayName: data.display_name }));

      localStorage.setItem("tokenInCookies", true);

      history.push("/dashboard");
    } catch (err) {
      console.log(err);
      setError("Could not sign up. Please check all the fields and make sure the email address is not already signed up.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-md px-8 pt-6 pb-8 mx-auto bg-gray-700 rounded shadow-md">
        {error && <Alert error>{error}</Alert>}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Email Address</label>
          <Input type="email" value={email} name="email" required autoFocus onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Display Name</label>
          <Input
            type="text"
            value={displayName}
            name="display_name"
            minLength={3}
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Password</label>
          <Input
            type="password"
            value={password}
            name="password"
            minLength={5}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold">Repeat Password</label>
          <Input
            type="password"
            value={repeatPassword}
            name="repeat_password"
            minLength={5}
            required
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <div className="flex">
          <div className="w-auto">
            <Button type="submit">Sign Up</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default RegisterPage;
