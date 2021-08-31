import { FC } from "react";

import classes from "./styles.module.scss";

type LabelProps = {
  htmlFor?: string;
  children?: string;
  margin?: string;
};

const Label: FC<LabelProps> = ({ children, htmlFor, margin }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={classes.Label}
      style={{ margin: margin }}
    >
      {children}
    </label>
  );
};

export default Label;
