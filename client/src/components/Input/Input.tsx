import { FC, FormEvent, HTMLProps } from "react";
import classes from "./styles.module.scss";

type InputProps = {
  name?: string;
  label?: string;
  value?: string;
  type?: "text" | "password";
  onChange?: (name: string, v: string) => void;
};

const Input: FC<InputProps> = ({
  name,
  label,
  value,
  type = "text",
  onChange,
}) => {
  const changeHandler = (e: FormEvent<HTMLInputElement>) => {
    if (!onChange || !name) return;
    onChange(name, e.currentTarget.value.trim());
  };

  return (
    <div className={classes.Controls}>
      <label htmlFor={name}>{label}</label>
      <input type={type} value={value} name={name} onChange={changeHandler} />
    </div>
  );
};

export default Input;
