import { FC } from "react";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import pencil from "assets/svg/pencil.svg";
import trash from "assets/svg/delete.svg";
import Card from "components/Card/Card";

import { Profile } from "redux/reducers/profileReducer";
import { RootState } from "redux/store";
import { UserReducer } from "redux/reducers/userReducer";

import classes from "./styles.module.scss";
import { deleteProfile } from "redux/actions/profileActions";

type ProfileCardProps = {
  profile: Profile;
};

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  const { id, name, birthday, city, gender, userId } = profile;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user as UserReducer);

  const deleteProfileHandler = () => {
    dispatch(deleteProfile(id));
  };

  const renderControls = () => {
    return (
      <div className={classes.CardControls}>
        <button>
          <p>edit</p>
          <ReactSVG src={pencil} />
        </button>
        <button onClick={deleteProfileHandler}>
          <p>delete</p>
          <ReactSVG src={trash} />
        </button>
      </div>
    );
  };

  return (
    <Card
      controls={
        (user?.id === userId || user?.role === "admin") && renderControls()
      }
    >
      <p>{name}</p>
      <p>{gender}</p>
      <p>{moment(birthday).format("DD.MM.YYYY")}</p>
      <p>{city}</p>
    </Card>
  );
};

export default ProfileCard;
