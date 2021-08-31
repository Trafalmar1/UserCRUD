import { Axios } from "./axios.config";

export const getUsers = () => {
  return Axios.get("/user").then((res) => {
    return res;
  });
};
