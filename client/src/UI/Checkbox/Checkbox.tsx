import { FC, FormEvent, useState } from "react";

import classes from "./styles.module.scss";

type CheckboxProps = {
  label: string;
  name: string;
  value: boolean;
  onChange: (name: string, v: boolean) => void;
};

const Checkbox: FC<CheckboxProps> = ({ label, name, value, onChange }) => {
  const [checked, setChecked] = useState(value);

  const toggleHandler = (e: FormEvent<HTMLInputElement>) => {
    onChange(name, !checked);
    setChecked(!checked);
  };

  return (
    <div className={classes.Container}>
      <input
        id={name}
        type="checkbox"
        checked={value}
        onChange={toggleHandler}
      />
      <span className={classes.Checkmark}></span>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
