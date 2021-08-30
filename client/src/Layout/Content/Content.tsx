import { Switch, Route } from "react-router-dom";

import { Dashboard, Home, Profiles, Users } from "pages";

import classes from "./styles.module.scss";

const Content = () => {
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
      </Switch>
    </section>
  );
};

export default Content;
