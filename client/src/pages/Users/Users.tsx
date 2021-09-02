import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Title } from "UI";
import { UserCard } from "components";
import { RootState } from "redux/store";
import { User, UserReducer } from "redux/reducers/userReducer";
import { getUsers } from "redux/actions/userActions";

import classes from "./styles.module.scss";

const Users = () => {
  const dispatch = useDispatch();
  const { users } = useSelector(
    (state: RootState) => state.user as UserReducer
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Title>Users:</Title>
      <div className={classes.ListContainer}>
        {Array.isArray(users) &&
          users?.map((user: User) => <UserCard key={user.id} {...user} />)}
      </div>
    </>
  );
};

export default Users;
