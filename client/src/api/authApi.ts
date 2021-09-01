import { Axios } from "./config/axios.config";

type SignUpData = {
  username: string;
  password: string;
  role: string;
};

type SignInResponse = {
  token: string;
  userId: string;
};

export const signUp = (data: SignUpData) => {
  return Axios.post("/sign-up", { ...data }).then((res) => {
    console.log(res);
  });
};
