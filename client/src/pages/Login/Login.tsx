import { Input } from "components";
import { Link } from "react-router-dom";
import { AuthButton, AuthTitle } from "UI";

import classes from "./styles.module.scss";
import useSignIn from "./useSignIn";

const Login = () => {
  const { formChangeHandler, inputBlurHandler, submitHandler, form } =
    useSignIn();

  return (
    <div className={classes.Center}>
      <AuthTitle>Sign in</AuthTitle>
      <form onSubmit={submitHandler} className={classes.Form}>
        <Input
          label="Email"
          value={form.email.value}
          valid={form.email.valid}
          touched={form.email.touched}
          name="email"
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
        />
        <Input
          label="Password"
          type="password"
          value={form.password.value}
          valid={form.password.valid}
          touched={form.password.touched}
          name="password"
          onBlur={inputBlurHandler}
          onChange={formChangeHandler}
        />
        <Link to="sign-up">Create new account</Link>
        <AuthButton type="submit" name={"Sign In"} />
      </form>
    </div>
  );
};

export default Login;
