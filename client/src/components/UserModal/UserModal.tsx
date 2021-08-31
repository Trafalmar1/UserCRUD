import { FC, FormEvent, useEffect, useState } from "react";
import { ReactSVG } from "react-svg";

import Input from "components/Input/Input";
import RadioButton from "components/RadioButton/RadioButton";
import check from "assets/svg/check.svg";
import cross from "assets/svg/cross.svg";
import { AuthButton, Label, Modal } from "UI";
import { User } from "components/UserDetails/UserDetails";

import classes from "./styles.module.scss";

type ProfileModalProps = {
  visible?: boolean;
  user?: User;
  toggle?: VoidFunction;
};

type FormData = {
  username: string;
  email: string;
  role: string;
};

const initialData: FormData = {
  username: "",
  email: "",
  role: "",
};

const UserModal: FC<ProfileModalProps> = ({ visible, user, toggle }) => {
  const [form, setForm] = useState<FormData>(initialData);

  const formChangeHandler = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!user) return;
    setForm(user);
  }, [user]);

  return (
    <Modal visible={visible} toggle={toggle}>
      <form onSubmit={submitHandler} className={classes.Form}>
        <Input
          label="user name:"
          value={form.username}
          name="name"
          onChange={formChangeHandler}
        />
        <Input
          label="email:"
          value={form.email}
          name="email"
          onChange={formChangeHandler}
        />
        <Label margin="0 0 2rem 0">role:</Label>
        <div className={classes.Row}>
          <RadioButton
            name="role"
            value="admin"
            label="admin"
            checked={form.role === "admin"}
            onChange={formChangeHandler}
          />
          <RadioButton
            name="role"
            value="user"
            label="user"
            checked={form.role === "user"}
            onChange={formChangeHandler}
          />
        </div>
        <div className={classes.Row}>
          <AuthButton type="submit">
            <ReactSVG src={check} />
          </AuthButton>
          <AuthButton type="button" onClick={toggle}>
            <ReactSVG src={cross} />
          </AuthButton>
        </div>
      </form>
    </Modal>
  );
};

export default UserModal;
