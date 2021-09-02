import { getUsers, getOneUser } from "./userApi";
import { signUp, signIn } from "./authApi";

const api = { getUsers, signUp, signIn, getOneUser };

export default api;
