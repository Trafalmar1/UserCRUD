import { ProfileCard } from "components";
import AddNewProfile from "components/ProfileCard/AddNewProfile/AddNewProfile";
import { classicNameResolver } from "typescript";
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
  return (
    <>
      <Title>Profiles:</Title>
      <div className={classes.ProfilesContainer}>
        {dummyData.map((profile) => (
          <ProfileCard key={profile.id} {...profile} />
        ))}
        <AddNewProfile />
      </div>
    </>
  );
};

export default Profiles;
