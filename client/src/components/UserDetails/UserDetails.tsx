import { FC, useState } from "react";
import { ReactSVG } from "react-svg";

import pencil from "assets/svg/pencil.svg";
import trash from "assets/svg/delete.svg";

import classes from "./styles.module.scss";
import UserModal from "components/UserModal/UserModal";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { UserReducer } from "redux/reducers/userReducer";

type UserDetailsProps = {};

const UserDetails: FC<UserDetailsProps> = () => {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const { user } = useSelector((state: RootState) => state.user as UserReducer);

  const toggleUserModal = () => {
    setUserModalVisible((prev) => !prev);
  };
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
        toggle={toggleUserModal}
        user={user}
      />
    </>
  );
};

export default UserDetails;
