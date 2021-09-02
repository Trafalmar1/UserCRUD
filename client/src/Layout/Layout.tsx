import useAuth from "hooks/useAuth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useHistory } from "react-router-dom";

import { login } from "redux/actions/authActions";
import { RootState } from "redux/store";
import Content from "./Content/Content";
import Navigation from "./Navigation/Navigation";

const Layout = () => {
  const { logoutHandler, setAutoLogout } = useAuth();
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state: RootState) => state.user);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate || !userId) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    if (!remainingMilliseconds) return;
    dispatch(login({ token, userId }));
    setAutoLogout(remainingMilliseconds);
  }, [dispatch, logoutHandler, setAutoLogout]);

  useEffect(() => {
    if (!loggedIn && history) {
      history.replace("/login");
    }
  }, [loggedIn, history]);

  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <Content />
      <footer></footer>
      <div id="modal-root"></div>
    </Router>
  );
};

export default Layout;
