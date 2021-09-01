import { Axios } from "./config/axios.config";

type SignUpData = {
  username: string;
  password: string;
  role: string;
};

export const signUp = (data: SignUpData) => {
  return Axios.post("/sign-up", { ...data }).then((res) => {
    return res.data;
  });
};
