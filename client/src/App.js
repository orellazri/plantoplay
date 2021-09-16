import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setLoggedIn, setUser } from "./slices/userSlice";
import Container from "./components/core/Container";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // If the user is not logged in, try to login in case he has a jwt token in the cookies
    const tryLoginJwt = async () => {
      try {
        const result = await axios.get("/auth/verify");
        const { id, email, display_name: displayName } = result.data;
        dispatch(setLoggedIn(true));
        dispatch(setUser({ id, email, displayName }));
      } catch (err) {}
    };

    if (!user.loggedIn && localStorage.getItem("tokenInCookies")) {
      tryLoginJwt();
    }
  }, [dispatch, user.loggedIn]);

  return (
    <Router>
      <Navbar />

      <Container>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
