import { FC, ReactNode } from "react";
import classes from "./styles.module.scss";

type CardProps = {
  children: ReactNode | ReactNode[];
  controls?: ReactNode;
  onClick?: VoidFunction | null;
};

const Card: FC<CardProps> = ({ children, controls, onClick }) => {
  const clickHandler = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <section
      className={[classes.Container, !!onClick && classes.Clickable].join(" ")}
      onClick={clickHandler}
    >
      <div className={classes.Content}>{children}</div>
      {controls}
    </section>
  );
};

export default Card;
