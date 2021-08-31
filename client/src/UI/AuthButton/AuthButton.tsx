import { FC, ReactNode } from "react";

import classes from "./styles.module.scss";

type ButtonProps = {
  onClick?: () => void;
  name?: string;
  type: "button" | "submit";
  children?: ReactNode;
};

const AuthButton: FC<ButtonProps> = ({
  onClick,
  name,
  type = "button",
  children,
}) => {
  return (
    <button type={type} className={classes.Container} onClick={onClick}>
      {children ? children : name}
    </button>
  );
};

export default AuthButton;
