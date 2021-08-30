import { ReactSVG } from "react-svg";

import add from "assets/svg/add.svg";

import classes from "../styles.module.scss";

const AddNewProfile = () => {
  return (
    <div className={[classes.Container, classes.Add].join(" ")}>
      <ReactSVG src={add} />
      <h3>Create new Profile</h3>
    </div>
  );
};

export default AddNewProfile;
