import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { GuardProvider, GuardedRoute } from "react-router-guards";
import axios from "axios";

import { setLoggedIn, setUser } from "./slices/userSlice";
import { logout } from "./utils";
import Alert from "./components/core/Alert";
import Container from "./components/core/Container";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SearchPage from "./pages/SearchPage";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // If the user is not logged in, try to login in case he has a jwt token in the cookies
    const tryLoginJwt = async () => {
      try {
        const result = await axios.get("/auth/verify");
        const { id, email, display_name: displayName } = result.data;

        dispatch(setLoggedIn(true));
        dispatch(setUser({ id, email, displayName }));
      } catch (err) {
        await logout(dispatch);
      }
    };

    if (!user.loggedIn && localStorage.getItem("tokenInCookies")) {
      tryLoginJwt();
    }
  }, [dispatch, user.loggedIn]);

  // Middleware for authentication
  const authMiddleware = (to, from, next) => {
    if (to.meta.authOnly && !localStorage.getItem("tokenInCookies")) {
      next.redirect("/login");
    }
    if (to.meta.guestOnly && localStorage.getItem("tokenInCookies")) {
      next.redirect("/dashboard");
    }
    next();
  };

  const Loading = () => <></>;
  const NotFound = () => <Alert error>Page not found.</Alert>;

  return (
    <Router>
      <GuardProvider guards={[authMiddleware]} loading={Loading} error={NotFound}>
        <Navbar />

        <Container>
          <Switch>
            <GuardedRoute path="/login" exact component={LoginPage} meta={{ guestOnly: true }} />
            <GuardedRoute path="/register" exact component={RegisterPage} meta={{ guestOnly: true }} />
            <GuardedRoute path="/dashboard" exact component={DashboardPage} meta={{ authOnly: true }} />
            <GuardedRoute path="/search/:title" exact component={SearchPage} meta={{ authOnly: true }} />
            <GuardedRoute path="/" exact component={HomePage} meta={{ guestOnly: true }} />
            <GuardedRoute path="*" component={NotFound} />
          </Switch>
        </Container>
      </GuardProvider>
    </Router>
  );
}

export default App;
