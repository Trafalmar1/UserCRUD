import { FC } from "react";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import Input from "components/Input/Input";
import RadioButton from "components/RadioButton/RadioButton";
import check from "assets/svg/check.svg";
import cross from "assets/svg/cross.svg";
import { AuthButton, Label, Modal } from "UI";
import { UserReducer } from "redux/reducers/userReducer";
import useUserModal from "./useUserModal";

import classes from "./styles.module.scss";
import { UserData } from "api/userApi";

type UserModalProps = {
  visible?: boolean;
  user: UserData;
  toggle: VoidFunction;
};

const UserModal: FC<UserModalProps> = ({ visible, user, toggle }) => {
  const {
    form,
    formChangeHandler,
    inputBlurHandler,
    submitHandler,
    resetForm,
  } = useUserModal(user);

  const { user: loggedInUser } = useSelector(
    (state: RootState) => state.user as UserReducer
  );

  return (
    <Modal visible={visible} toggle={() => resetForm(toggle)}>
      <form onSubmit={(e) => submitHandler(e, toggle)} className={classes.Form}>
        <Input
          label="user name:"
          value={form.username.value}
          valid={form.username.valid}
          touched={form.username.touched}
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
          name="username"
        />
        <Input
          label="email:"
          value={form.email.value}
          valid={form.email.valid}
          touched={form.email.touched}
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
          name="email"
        />
        {loggedInUser?.role === "admin" && (
          <>
            <Label margin="0 0 2rem 0">role:</Label>
            <div className={classes.Row}>
              <RadioButton
                name="role"
                value="admin"
                label="admin"
                checked={form.role.value === "admin"}
                onChange={formChangeHandler}
              />
              <RadioButton
                name="role"
                value="user"
                label="user"
                checked={form.role.value === "user"}
                onChange={formChangeHandler}
              />
            </div>
          </>
        )}

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

export default UserModal;
