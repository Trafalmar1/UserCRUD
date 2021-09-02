import { ProfileCard, ProfileModal, UserDetails } from "components";
import AddNewProfile from "components/ProfileCard/AddNewProfile/AddNewProfile";
import { useState } from "react";
import { Title } from "UI";

import classes from "./styles.module.scss";

const dummyData = [
  {
    id: "1",
    username: "Trafalmar",
    gender: "male",
    birthday: "08.09.1999",
    city: "Khmelnytskyi",
  },
  {
    id: "2",
    username: "Trafalmar",
    gender: "male",
    birthday: "08.09.1999",
    city: "Khmelnytskyi",
  },
  {
    id: "3",
    username: "Trafalmar",
    gender: "male",
    birthday: "08.09.1999",
    city: "Khmelnytskyi",
  },
];

const Profiles = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
        {dummyData.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
        <AddNewProfile onClick={toggleModal} />
      </div>
      <ProfileModal visible={modalVisible} toggle={toggleModal} />
    </>
  );
};

export default Profiles;
