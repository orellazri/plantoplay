import axios from "axios";
import { setLoggedIn, setUser } from "./slices/userSlice";

const logout = async (dispatch) => {
  try {
    await axios.get("/auth/logout");
  } catch (err) {
  } finally {
    localStorage.removeItem("tokenInCookies");
    dispatch(setLoggedIn(false));
    dispatch(setUser({ id: -1, email: "", displayName: "" }));
    window.location = "/";
  }
};

const availableLists = () => {
  return [
    { name: "Plan to Play", value: "plantoplay" },
    { name: "Playing", value: "playing" },
    { name: "Finished", value: "finished" },
    { name: "Dropped", value: "dropped" },
  ];
};

export { logout, availableLists };
