import { FC } from "react";

import classes from "./styles.module.scss";

type LabelProps = {
  htmlFor?: string;
  children?: string;
  margin?: string;
  valid?: boolean;
};

const Label: FC<LabelProps> = ({ children, htmlFor, margin, valid = true }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={[classes.Label, !valid && classes.Invalid].join(" ")}
      style={{ margin: margin }}
    >
      {children}
    </label>
  );
};

export default Label;
