import axios from "axios";
import { setLoggedIn, setUser } from "./slices/userSlice";

// Available lists for games
const availableLists = [
  { name: "Plan to Play", value: "plantoplay" },
  { name: "Playing", value: "playing" },
  { name: "Finished", value: "finished" },
  { name: "Dropped", value: "dropped" },
];

// Log a user out
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

export { logout, availableLists };
