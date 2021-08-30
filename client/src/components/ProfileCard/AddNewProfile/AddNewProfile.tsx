import { ReactSVG } from "react-svg";

import add from "assets/svg/add.svg";

import classes from "../styles.module.scss";

const AddNewProfile = () => {
  return (
    <div className={classes.Add}>
      <ReactSVG src={add} />
      <h3>Create new Profile</h3>
    </div>
  );
};

export default AddNewProfile;
