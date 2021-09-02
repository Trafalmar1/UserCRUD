import { FC } from "react";
import { ReactSVG } from "react-svg";

import { AuthButton, Label, Modal } from "UI";
import { Input } from "components";
import check from "assets/svg/check.svg";
import cross from "assets/svg/cross.svg";

import classes from "./styles.module.scss";
import RadioButton from "components/RadioButton/RadioButton";
import useProfileModal from "./useProfileModal";

type ProfileModalProps = {
  visible?: boolean;
  toggle: VoidFunction;
};

const ProfileModal: FC<ProfileModalProps> = ({ visible, toggle }) => {
  const {
    form,
    inputBlurHandler,
    formChangeHandler,
    submitHandler,
    resetForm,
  } = useProfileModal();

  return (
    <Modal visible={visible} toggle={() => resetForm(toggle)}>
      <form onSubmit={(e) => submitHandler(e, toggle)} className={classes.Form}>
        <Input
          label="name:"
          value={form.name.value}
          valid={form.name.valid}
          touched={form.name.touched}
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
          name="name"
        />

        <Label margin="0 0 2rem 0">gender:</Label>
        <div className={classes.Row}>
          <RadioButton
            name="gender"
            value="male"
            label="male"
            checked={form.gender.value === "male"}
            onChange={formChangeHandler}
          />
          <RadioButton
            name="gender"
            value="female"
            label="female"
            checked={form.gender.value === "female"}
            onChange={formChangeHandler}
          />
        </div>

        <Input
          label="birthday:"
          value={form.birthday.value}
          valid={form.birthday.valid}
          touched={form.birthday.touched}
          placeholder={"dd.mm.yyyy"}
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
          name="birthday"
        />
        <Input
          label="city:"
          value={form.city.value}
          valid={form.city.valid}
          touched={form.city.touched}
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
          name="city"
        />
        <div className={classes.Row}>
          <AuthButton type="submit">
            <ReactSVG src={check} />
          </AuthButton>
          <AuthButton type="button" onClick={() => resetForm(toggle)}>
            <ReactSVG src={cross} />
          </AuthButton>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileModal;
