import { useEffect } from "react";
import { useSelector } from "react-redux";

import { Title } from "UI";
import { UserCard } from "components";
import { useAppDispatch } from "hooks/hooks";
import { RootState } from "redux/store";
import { User } from "redux/reducers/userReducer";
import { getUsers } from "redux/actions/userActions";

import classes from "./styles.module.scss";

const Users = () => {
  const dispatch = useAppDispatch();
  const { users } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUsers());
    console.log(users);
  }, []);

  return (
    <>
      <Title>Users:</Title>
      <div className={classes.ListContainer}>
        {!!users &&
          users?.map((user: User) => <UserCard key={user.id} {...user} />)}
      </div>
    </>
  );
};

export default Users;
