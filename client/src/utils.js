import axios from "axios";
import { setLoggedIn, setUser } from "./slices/userSlice";

// Available lists for games
const availableLists = [
  { name: "Plan to Play", value: "plantoplay", colors: ["#feb47b", "#ff7e5f  "] },
  { name: "Playing", value: "playing", colors: ["#a8e063", "#56ab2f  "] },
  { name: "Finished", value: "finished", colors: ["#6dd5ed", "#2193b0 "] },
  { name: "Dropped", value: "dropped", colors: ["#734b6d  ", "#47315c   "] },
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
