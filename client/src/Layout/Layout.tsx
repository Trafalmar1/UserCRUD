import { BrowserRouter as Router } from "react-router-dom";
import Content from "./Content/Content";
import Navigation from "./Navigation/Navigation";

const Layout = () => {
  return (
    <Router>
      <header>
        <Navigation />
      </header>
      <Content />
      <footer></footer>
    </Router>
  );
};

export default Layout;
