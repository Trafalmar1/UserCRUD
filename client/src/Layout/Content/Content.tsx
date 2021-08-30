import { Switch, Route } from "react-router-dom";

import { Dashboard, Home, Login, Profiles, SignUp, Users } from "pages";

import classes from "./styles.module.scss";
import useFullscreen from "hooks/useFullscreen";

const Content = () => {
  const { isFullscreen } = useFullscreen();
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
      </Switch>
    </section>
  );
};

export default Content;
