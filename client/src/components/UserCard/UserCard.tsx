import Card from "components/Card/Card";
import { FC } from "react";

type UserProps = {
  id: string;
  username: string;
  email: string;
  profiles: number;
};

const UserCard: FC<UserProps> = ({ username, email, profiles, id }) => {
  return (
    <Card>
      <p>{username}</p>
      <p>{email}</p>
      <p>{`${profiles} ${profiles == 1 ? "profile" : "profiles"}`}</p>
    </Card>
  );
};

export default UserCard;
