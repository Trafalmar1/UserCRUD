import { Switch, Route } from "react-router-dom";

import { Home, Profiles } from "pages";

import classes from "./styles.module.scss";

const Content = () => {
  return (
    <section className={classes.Container}>
      <Switch>
        <Route path="/profiles" exact>
          <Profiles />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </section>
  );
};

export default Content;
