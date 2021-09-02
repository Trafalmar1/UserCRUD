import { Switch, Route, Redirect } from "react-router-dom";

import { Dashboard, Home, Login, Profiles, SignUp, Users } from "pages";
import useFullscreen from "hooks/useFullscreen";

import classes from "./styles.module.scss";

const Content = () => {
  const { isFullscreen } = useFullscreen();

  if (!localStorage.getItem("token")) {
    return (
      <section
        className={[classes.Container, isFullscreen && classes.Fullscreen].join(
          " "
        )}
      >
        <Switch>
          <Route path="/sign-up" exact>
            <SignUp />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Redirect to="/login" />
        </Switch>
      </section>
    );
  }

  return (
    <section className={classes.Container}>
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/profiles" exact>
          <Profiles />
        </Route>
        <Route path="/dashboard" exact>
          <Dashboard />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Redirect to="/" />
      </Switch>
    </section>
  );
};

export default Content;
