import { FC, useState } from "react";

import classes from "./styles.module.scss";

type CheckboxProps = {
  label: string;
  name: string;
  value: boolean;
  checkedValue: string;
  defaultValue: string;
  onChange: (name: any, v: string) => void;
};

const Checkbox: FC<CheckboxProps> = ({
  label,
  name,
  value,
  checkedValue,
  defaultValue,
  onChange,
}) => {
  const [checked, setChecked] = useState(value);

  const toggleHandler = () => {
    onChange(name, !checked ? checkedValue : defaultValue);
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
      <span className={classes.Checkmark} onClick={toggleHandler}></span>
      <label htmlFor={name}>{label}</label>
    </div>
  );
};

export default Checkbox;
