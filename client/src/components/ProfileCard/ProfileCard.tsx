import { FC } from "react";
import { ReactSVG } from "react-svg";

import pencil from "assets/svg/pencil.svg";
import trash from "assets/svg/delete.svg";

import classes from "./styles.module.scss";

type ProfileCardProps = {
  id: string;
  username: string;
  gender: string;
  birthday: string;
  city: string;
};

const ProfileCard: FC<ProfileCardProps> = ({
  username,
  gender,
  birthday,
  city,
}) => {
  return (
    <section className={classes.Container}>
      <div className={classes.Content}>
        <p>{username}</p>
        <p>{gender}</p>
        <p>{birthday}</p>
        <p>{city}</p>
      </div>
      <div className={classes.CardControls}>
        <button>
          <p>edit</p>
          <ReactSVG src={pencil} />
        </button>
        <button>
          <p>delete</p>
          <ReactSVG src={trash} />
        </button>
      </div>
    </section>
  );
};

export default ProfileCard;
