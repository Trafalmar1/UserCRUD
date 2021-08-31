import Card from "components/Card/Card";
import { FC } from "react";

type UserProps = {
  username: string;
  email: string;
  profiles?: number;
};

const UserCard: FC<UserProps> = ({ username, email, profiles }) => {
  return (
    <Card>
      <p>{username}</p>
      <p>{email}</p>
      <p>{`${profiles ? profiles : 0} ${
        profiles === 1 ? "profile" : "profiles"
      }`}</p>
    </Card>
  );
};

export default UserCard;
