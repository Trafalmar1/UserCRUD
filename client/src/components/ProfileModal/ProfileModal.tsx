import { FC, FormEvent, useState } from "react";
import { ReactSVG } from "react-svg";

import { AuthButton, Checkbox, Label, Modal } from "UI";
import { Input } from "components";
import check from "assets/svg/check.svg";
import cross from "assets/svg/cross.svg";

import classes from "./styles.module.scss";
import RadioButton from "components/RadioButton/RadioButton";

type ProfileModalProps = {
  visible?: boolean;
  toggle?: VoidFunction;
};

type FormData = {
  name: string;
  gender: string;
  birthday: string;
  city: string;
};

const initialData: FormData = {
  name: "",
  gender: "male",
  birthday: "",
  city: "",
};

const ProfileModal: FC<ProfileModalProps> = ({ visible, toggle }) => {
  const [form, setForm] = useState<FormData>(initialData);

  const formChangeHandler = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <Modal visible={visible} toggle={toggle}>
      <form onSubmit={submitHandler} className={classes.Form}>
        <Input
          label="name:"
          value={form.name}
          name="name"
          onChange={formChangeHandler}
        />

        <Label margin="0 0 2rem 0">gender:</Label>
        <div className={classes.Row}>
          <RadioButton
            name="gender"
            value="male"
            label="male"
            checked={form.gender === "male"}
            onChange={formChangeHandler}
          />
          <RadioButton
            name="gender"
            value="female"
            label="female"
            checked={form.gender === "female"}
            onChange={formChangeHandler}
          />
        </div>

        <Input
          label="birthday:"
          value={form.birthday}
          name="birthday"
          onChange={formChangeHandler}
        />
        <Input
          label="city:"
          value={form.city}
          name="city"
          onChange={formChangeHandler}
        />
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

export default ProfileModal;
