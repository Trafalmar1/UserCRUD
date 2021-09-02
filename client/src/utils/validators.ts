import moment from "moment";

export const email = (value: string) =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
    value
  );

export const notEmpty = (value: string) => {
  return value.trim() !== "";
};

export const isDate = (value: string) => {
  return moment(value, "DD.MM.YYYY", true).isValid();
};
