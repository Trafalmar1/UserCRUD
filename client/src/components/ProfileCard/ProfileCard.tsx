import { FC, useState } from "react";
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
import ProfileModal from "components/ProfileModal/ProfileModal";

type ProfileCardProps = {
  profile: Profile;
};

const ProfileCard: FC<ProfileCardProps> = ({ profile }) => {
  const { id, name, birthday, city, gender, userId } = profile;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user as UserReducer);

  const deleteProfileHandler = () => {
    dispatch(deleteProfile(id));
  };

  const toggleHandler = () => {
    setModalVisible((prev) => !prev);
  };

  const renderControls = () => {
    return (
      <>
        <div className={classes.CardControls}>
          <button onClick={toggleHandler}>
            <p>edit</p>
            <ReactSVG src={pencil} />
          </button>
          <button onClick={deleteProfileHandler}>
            <p>delete</p>
            <ReactSVG src={trash} />
          </button>
        </div>
        <ProfileModal
          toggle={toggleHandler}
          visible={modalVisible}
          mode="update"
          profile={{ id, name, birthday, city, gender }}
        />
      </>
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
