import { FC } from "react";

import classes from "./styles.module.scss";

type Props = {
  name: string;
  label: string;
  value: string;
  checked?: boolean;
  onChange: (name: string, v: string) => void;
};

const RadioButton: FC<Props> = ({ name, value, label, checked, onChange }) => {
  const changeHandler = () => {
    onChange(name, value);
  };

  return (
    <div className={classes.Controls}>
      <input
        id={value}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        className={classes.RadioButton}
        onChange={changeHandler}
      />
      <label htmlFor={value}>{label}</label>
    </div>
  );
};

export default RadioButton;
