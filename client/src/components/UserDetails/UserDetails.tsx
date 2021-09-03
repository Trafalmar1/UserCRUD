import { FC, useState } from "react";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";

import pencil from "assets/svg/pencil.svg";
import trash from "assets/svg/delete.svg";
import { User, UserReducer } from "redux/reducers/userReducer";
import { RootState } from "redux/store";
import UserModal from "components/UserModal/UserModal";
import { logout } from "redux/actions/authActions";

import classes from "./styles.module.scss";
import { getProfiles } from "redux/actions/profileActions";
import { deleteUser } from "redux/actions/userActions";

type UserDetailsProps = {
  user: User | null;
};

const UserDetails: FC<UserDetailsProps> = ({ user }) => {
  const [userModalVisible, setUserModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { user: loggedInUser } = useSelector(
    (state: RootState) => state.user as UserReducer
  );

  const toggleUserModal = () => {
    setUserModalVisible((prev) => !prev);
  };

  const deleteUserHandler = async () => {
    if (!window.confirm(`Do you really want to delete ${user?.email} account?`))
      return;
    const username = window.prompt(`Enter "${user?.username}" to confirm`);
    if (username?.trim() === user?.username) {
      if (!user?.id) return;
      await dispatch(deleteUser(user.id));
      if (loggedInUser?.id === user.id) {
        dispatch(logout());
        return;
      }
      dispatch(getProfiles());
    } else {
      alert("Fail to delete");
    }
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
          <button onClick={deleteUserHandler}>
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
