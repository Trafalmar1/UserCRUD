import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import avatar from "assets/pics/avatar.png";
import profiles from "assets/pics/Profiles.png";
import dashboard from "assets/pics/Dashboard.png";
import users from "assets/pics/Users.png";
import { NavButton } from "UI";
import { UserReducer } from "redux/reducers/userReducer";
import useFullscreen from "hooks/useFullscreen";
import { RootState } from "redux/store";

import classes from "./styles.module.scss";
import { logout } from "redux/actions/authActions";

const Navigation = () => {
  const { isFullscreen } = useFullscreen();
  const dispatch = useDispatch();
  const user: UserReducer = useSelector((state: RootState) => state.user);

  if (isFullscreen || !user?.loggedIn) return null;
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
          <NavButton
            name="Log out"
            to="/logout"
            onClick={() => dispatch(logout())}
          />
        </li>
      </menu>
    </div>
  );
};

export default Navigation;
