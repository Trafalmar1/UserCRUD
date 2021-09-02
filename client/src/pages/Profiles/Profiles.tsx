import { ProfileCard, ProfileModal, UserDetails } from "components";
import AddNewProfile from "components/ProfileCard/AddNewProfile/AddNewProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "redux/actions/profileActions";
import { ProfileReducer } from "redux/reducers/profileReducer";
import { RootState } from "redux/store";
import { Title } from "UI";

import classes from "./styles.module.scss";

const Profiles = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { profiles } = useSelector(
    (state: RootState) => state.profiles as ProfileReducer
  );

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  return (
    <>
      <div className={classes.UserDetailsContainer}>
        <UserDetails />
      </div>
      <Title>Profiles:</Title>
      <div className={classes.ProfilesContainer}>
        {Array.isArray(profiles) &&
          profiles?.map((profile) => (
            <ProfileCard key={profile?.id} profile={profile} />
          ))}
        <AddNewProfile onClick={toggleModal} />
      </div>
      <ProfileModal visible={modalVisible} toggle={toggleModal} />
    </>
  );
};

export default Profiles;
