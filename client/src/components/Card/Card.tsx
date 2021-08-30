import { FC, ReactNode } from "react";
import classes from "./styles.module.scss";

type CardProps = {
  children: ReactNode | ReactNode[];
  controls?: ReactNode;
};

const Card: FC<CardProps> = ({ children, controls }) => {
  return (
    <section className={classes.Container}>
      <div className={classes.Content}>{children}</div>
      {controls}
    </section>
  );
};

export default Card;
