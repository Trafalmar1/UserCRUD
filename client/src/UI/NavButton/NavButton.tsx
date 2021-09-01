import { FC } from "react";
import { NavLink } from "react-router-dom";

import classes from "./styles.module.scss";

export type LinkProps = {
  name: string;
  to: string;
  exact?: boolean;
  color?: string;
  img?: string;
  onClick?: VoidFunction;
};

const NavButton: FC<LinkProps> = ({
  img,
  name,
  to,
  exact,
  color = "limegreen",
  onClick,
}) => {
  return (
    <NavLink
      onClick={onClick}
      className={classes.Link}
      activeClassName={classes.Active}
      to={to}
      exact={exact}
      color={color}
    >
      {name}
      {!!img && <img src={img} alt={name} />}
    </NavLink>
  );
};
export default NavButton;
