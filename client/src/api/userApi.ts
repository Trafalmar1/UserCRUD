import { Axios } from "./config/axios.config";

export const getUsers = () => {
  return Axios.get("/user").then((res) => {
    return res;
  });
};
