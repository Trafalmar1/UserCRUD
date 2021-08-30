import { Switch, Route } from "react-router-dom";

import { Home } from "pages";

import classes from "./styles.module.scss";

const Content = () => {
  return (
    <section className={classes.Container}>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
      </Switch>
    </section>
  );
};

export default Content;
