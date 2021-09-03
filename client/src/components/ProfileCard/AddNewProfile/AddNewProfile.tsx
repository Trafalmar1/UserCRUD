import { FC } from "react";
import { ReactSVG } from "react-svg";

import add from "assets/svg/add.svg";

import classes from "../styles.module.scss";

type Props = {
  onClick: VoidFunction;
};

const AddNewProfile: FC<Props> = ({ onClick }) => {
  return (
    <section className={classes.Add} onClick={onClick}>
      <ReactSVG src={add} />
      <h3>Create new Profile</h3>
    </section>
  );
};

export default AddNewProfile;
