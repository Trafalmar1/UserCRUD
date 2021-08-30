import { FC } from "react";
import classes from "./styles.module.scss";

type TitleProps = {
  children: string;
};

const Title: FC<TitleProps> = ({ children }) => {
  return <h1 className={classes.Title}>{children}</h1>;
};

export default Title;
