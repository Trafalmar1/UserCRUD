import { Link } from "react-router-dom";

import { Input } from "components";
import { AuthButton, AuthTitle, Checkbox } from "UI";

import classes from "./styles.module.scss";
import useSignUp from "./useSignUp";

const SignUp = () => {
  const { submitHandler, inputBlurHandler, formChangeHandler, form } =
    useSignUp();

  return (
    <div className={classes.Center}>
      <AuthTitle>Create your account</AuthTitle>
      <form onSubmit={submitHandler} className={classes.Form}>
        <Input
          label="Username"
          value={form.username.value}
          name="username"
          touched={form.username.touched}
          valid={form.username.valid}
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
        />
        <Input
          label="Email"
          value={form.email.value}
          name="email"
          touched={form.email.touched}
          valid={form.email.valid}
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
        />
        <Input
          label="Password"
          type="password"
          touched={form.password.touched}
          valid={form.password.valid}
          value={form.password.value}
          name="password"
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
        />
        <Checkbox
          label="is admin"
          checkedValue="admin"
          defaultValue="user"
          value={form.role.value === "admin"}
          name="role"
          onChange={formChangeHandler}
        />
        <Link to="login">Sign in</Link>
        <AuthButton type="submit" name={"Sign Up"} />
      </form>
    </div>
  );
};

export default SignUp;
