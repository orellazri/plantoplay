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

export { logout };
