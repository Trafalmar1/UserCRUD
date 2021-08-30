import { FC } from "react";
import { ReactSVG } from "react-svg";

import pencil from "assets/svg/pencil.svg";
import trash from "assets/svg/delete.svg";

import classes from "./styles.module.scss";

type UserDetailsProps = {
  id?: string;
};

const UserDetails: FC<UserDetailsProps> = ({ id }) => {
  return (
    <div className={classes.Container}>
      <h1>Trafalmar</h1>
      <h1>vladiksav2@gmail.com</h1>
      <h3>user</h3>
      <div className={classes.Controls}>
        <button>
          <ReactSVG src={pencil} />
        </button>
        <button>
          <ReactSVG src={trash} />
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
