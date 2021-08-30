import { Input } from "components";
import { FormEvent, useState } from "react";
import { AuthButton, AuthTitle } from "UI";

import classes from "./styles.module.scss";

type LoginFormData = {
  email: string;
  password: string;
};

const initialData: LoginFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState<LoginFormData>(initialData);

  const formChangeHandler = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={classes.Center}>
      <AuthTitle>Sign in</AuthTitle>
      <form onSubmit={submitHandler} className={classes.Form}>
        <Input
          label="Email"
          value={form.email}
          name="Email"
          onChange={formChangeHandler}
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          name="Password"
          onChange={formChangeHandler}
        />
        <AuthButton type="submit" name={"Sign In"} />
      </form>
    </div>
  );
};

export default Login;
