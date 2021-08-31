import { Input } from "components";
import { FormEvent, useState } from "react";
import { AuthButton, AuthTitle, Checkbox } from "UI";

import classes from "./styles.module.scss";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  isAdmin: string;
};

const initialData: SignUpFormData = {
  username: "",
  email: "",
  password: "",
  isAdmin: "",
};

const SignUp = () => {
  const [form, setForm] = useState<SignUpFormData>(initialData);

  const formChangeHandler = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={classes.Center}>
      <AuthTitle>Create your account</AuthTitle>
      <form onSubmit={submitHandler} className={classes.Form}>
        <Input
          label="Username"
          value={form.username}
          name="username"
          onChange={formChangeHandler}
        />
        <Input
          label="Email"
          value={form.email}
          name="email"
          onChange={formChangeHandler}
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          name="password"
          onChange={formChangeHandler}
        />
        <Checkbox
          label="is admin"
          value={form.isAdmin === "is admin"}
          name="isAdmin"
          onChange={formChangeHandler}
        />
        <AuthButton type="submit" name={"Sign Up"} />
      </form>
    </div>
  );
};

export default SignUp;
