import Card from "components/Card/Card";
import { FC } from "react";
import { User } from "redux/reducers/userReducer";

const UserCard: FC<User> = ({ username, email, profiles }) => {
  return (
    <Card>
      <p>{username}</p>
      <p>{email}</p>
      <p>{`${profiles.length ? profiles.length : 0} ${
        profiles.length === 1 ? "profile" : "profiles"
      }`}</p>
    </Card>
  );
};

export default UserCard;
