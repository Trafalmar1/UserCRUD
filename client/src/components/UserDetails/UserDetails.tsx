import { FC, useState } from "react";
import { ReactSVG } from "react-svg";

import pencil from "assets/svg/pencil.svg";
import trash from "assets/svg/delete.svg";

import classes from "./styles.module.scss";
import UserModal from "components/UserModal/UserModal";
import { User } from "redux/reducers/userReducer";

type UserDetailsProps = {
  id?: string;
};

const dummyUser: User = {
  id: "1",
  username: "TrafalMar",
  email: "vladiksav2@gmail.com",
  role: "user",
};

const UserDetails: FC<UserDetailsProps> = ({ id }) => {
  const [userModalVisible, setUserModalVisible] = useState(false);

  const toggleUserModal = () => {
    setUserModalVisible((prev) => !prev);
  };
  return (
    <>
      <div className={classes.Container}>
        <h1>{dummyUser.username}</h1>
        <h1>{dummyUser.email}</h1>
        <h3>{dummyUser.email}</h3>
        <div className={classes.Controls}>
          <button onClick={toggleUserModal}>
            <ReactSVG src={pencil} />
          </button>
          <button>
            <ReactSVG src={trash} />
          </button>
        </div>
      </div>
      <UserModal
        visible={userModalVisible}
        toggle={toggleUserModal}
        user={dummyUser}
      />
    </>
  );
};

export default UserDetails;
