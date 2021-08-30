import classes from "./styles.module.scss";
import avatar from "assets/pics/avatar.png";
import profiles from "assets/pics/Profiles.png";
import dashboard from "assets/pics/Dashboard.png";
import users from "assets/pics/Users.png";

import { NavButton } from "UI";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className={classes.Navigation}>
      <NavLink to="/" className={classes.AvatarContainer}>
        <img src={avatar} alt="avatar" className={classes.Image} />
        <h3 className={classes.Username}>Username</h3>
      </NavLink>
      <menu className={classes.MenuContainer}>
        <li>
          <NavButton name="Profiles" to="/profiles" img={profiles} />
        </li>
        <li>
          <NavButton name="Dashboard" to="/dashboard" img={dashboard} />
        </li>
        <li>
          <NavButton name="Users" to="/users" img={users} />
        </li>
        <li>
          <NavButton name="Log out" to="/logout" />
        </li>
      </menu>
    </div>
  );
};

export default Navigation;
