import { ProfileCard, ProfileModal, UserDetails } from "components";
import AddNewProfile from "components/ProfileCard/AddNewProfile/AddNewProfile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "redux/actions/profileActions";
import { ProfileReducer } from "redux/reducers/profileReducer";
import { UserReducer } from "redux/reducers/userReducer";
import { RootState } from "redux/store";
import { Title } from "UI";

import classes from "./styles.module.scss";

const Profiles = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user as UserReducer);
  const { profiles } = useSelector(
    (state: RootState) => state.profiles as ProfileReducer
  );
  const { profileOwner } = useSelector(
    (state: RootState) => state.user as UserReducer
  );

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const toggleModal = () => {
    setModalVisible((prev) => !prev);
  };

  const sortByCreation = (a: any, b: any) => {
    if (!b?.createdAt || !a?.createdAt) return 0;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  };

  return (
    <>
      <div className={classes.UserDetailsContainer}>
        <UserDetails user={profileOwner ? profileOwner : user} />
      </div>
      <Title>Profiles:</Title>
      <div className={classes.ProfilesContainer}>
        {Array.isArray(profiles) &&
          profiles
            ?.sort(sortByCreation)
            ?.map((profile) => (
              <ProfileCard key={profile?.id} profile={profile} />
            ))}
        <AddNewProfile onClick={toggleModal} />
      </div>
      <ProfileModal visible={modalVisible} toggle={toggleModal} />
    </>
  );
};

export default Profiles;
