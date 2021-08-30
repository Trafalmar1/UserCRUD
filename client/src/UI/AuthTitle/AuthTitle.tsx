import { FC } from "react";
import classes from "./styles.module.scss";

type AuthTitleProps = {
  children: string;
};

const AuthTitle: FC<AuthTitleProps> = ({ children }) => {
  return <h1 className={classes.Title}>{children}</h1>;
};

export default AuthTitle;
