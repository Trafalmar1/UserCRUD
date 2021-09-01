import api from "api";
import { Input } from "components";
import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthButton, AuthTitle, Checkbox } from "UI";

import classes from "./styles.module.scss";

type SignUpFormData = {
  username: string;
  email: string;
  password: string;
  role: string;
};

const initialData: SignUpFormData = {
  username: "",
  email: "",
  password: "",
  role: "user",
};

const SignUp = () => {
  const [form, setForm] = useState<SignUpFormData>(initialData);
  const history = useHistory();

  const formChangeHandler = (name: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    api
      .signUp(form)
      .then((res) => {
        console.log("Account was created", res);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
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
          checkedValue="admin"
          defaultValue="user"
          value={form.role === "admin"}
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
