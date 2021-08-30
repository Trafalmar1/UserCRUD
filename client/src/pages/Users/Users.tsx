import classes from "./styles.module.scss";

import { Title } from "UI";
import { UserCard } from "components";

const dummyData = [
  {
    id: "1",
    username: "Trafalmar",
    email: "vladiksav2@gmail.com",
    profiles: 3,
  },
  {
    id: "3",
    username: "Trafalmar",
    email: "vladiksav2@gmail.com",
    profiles: 1,
  },
  {
    id: "2",
    username: "Trafalmar",
    email: "vladiksav2@gmail.com",
    profiles: 2,
  },
  {
    id: "4",
    username: "Trafalmar",
    email: "vladiksav2@gmail.com",
    profiles: 4,
  },
  {
    id: "5",
    username: "Trafalmar",
    email: "vladiksav2@gmail.com",
    profiles: 6,
  },
];

const Users = () => {
  return (
    <>
      <Title>Users:</Title>
      <div className={classes.ListContainer}>
        {dummyData.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </>
  );
};

export default Users;
