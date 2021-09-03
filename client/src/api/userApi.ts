import { Axios } from "./config/axios.config";

export type UserData = {
  id?: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
};

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

export const updateUser = (data: UserData) => {
  return Axios.put(`/user`, { ...data }).then((res) => {
    return res;
  });
};

export const deleteUser = (id: string) => {
  return Axios.delete(`/user/${id}`).then((res) => {
    return res;
  });
};
