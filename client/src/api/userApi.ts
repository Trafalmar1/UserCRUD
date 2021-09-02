import { Axios } from "./config/axios.config";

export const getUsers = () => {
  return Axios.get("/user").then((res) => {
    return res;
  });
};

export const getOneUser = (id: string) => {
  return Axios.get(`/user/${id}`).then((res) => {
    return res;
  });
};
