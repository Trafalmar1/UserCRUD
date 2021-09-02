import { Axios } from "./config/axios.config";

type SignUpData = {
  username: string;
  password: string;
  role: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type SignInData = {
  token?: string;
  userId?: string;
  role?: string;
};

export const signUp = (data: SignUpData) => {
  return Axios.post("/sign-up", { ...data }).then((res) => {
    return res.data;
  });
};

export const signIn = (data: LoginData) => {
  return Axios.post("/login", { ...data }).then((res) => {
    return res.data as SignInData;
  });
};
