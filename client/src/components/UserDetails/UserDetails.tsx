import { FC, useState } from "react";
import { ReactSVG } from "react-svg";

import pencil from "assets/svg/pencil.svg";
import trash from "assets/svg/delete.svg";

import classes from "./styles.module.scss";
import UserModal from "components/UserModal/UserModal";
import { User } from "redux/reducers/userReducer";

type UserDetailsProps = {
  user: User | null;
};

const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  const [userModalVisible, setUserModalVisible] = useState(false);

  const toggleUserModal = () => {
    setUserModalVisible((prev) => !prev);
  };

  if (!user) return null;

  return (
    <>
      <div className={classes.Container}>
        <h1>{user?.username}</h1>
        <h1>{user?.email}</h1>
        <h3>{user?.role}</h3>
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
        user={user}
        toggle={toggleUserModal}
      />
    </>
  );
};

export default UserDetails;
