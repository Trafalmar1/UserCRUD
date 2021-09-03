import { Axios } from "./config/axios.config";

export type ProfileData = {
  id?: string;
  name: string;
  birthday: string;
  city: string;
  gender: string;
  createdAt?: string;
};

export const getProfiles = () => {
  return Axios.get("/profile").then((res) => {
    return res;
  });
};

export const createProfile = (data: ProfileData) => {
  return Axios.post("/profile", { ...data }).then((res) => {
    return res;
  });
};

export const deleteProfile = (id: string) => {
  return Axios.delete(`/profile/${id}`).then((res) => {
    return res;
  });
};

export const updateProfile = (data: ProfileData) => {
  return Axios.put("/profile", { ...data }).then((res) => {
    return res;
  });
};
