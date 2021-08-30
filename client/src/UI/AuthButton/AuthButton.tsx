import { FC } from "react";

import classes from "./styles.module.scss";

type ButtonProps = {
  onClick?: () => void;
  name: string;
  type: "button" | "submit";
};

const AuthButton: FC<ButtonProps> = ({ onClick, name, type = "button" }) => {
  return (
    <button type={type} className={classes.Container} onClick={onClick}>
      {name}
    </button>
  );
};

export default AuthButton;
