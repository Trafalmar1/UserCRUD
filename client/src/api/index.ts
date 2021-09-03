import { getUsers, getOneUser, updateUser } from "./userApi";
import { signUp, signIn } from "./authApi";
import {
  getProfiles,
  createProfile,
  deleteProfile,
  updateProfile,
} from "./profileApi";

const api = {
  getUsers,
  updateUser,
  signUp,
  signIn,
  getOneUser,
  getProfiles,
  createProfile,
  deleteProfile,
  updateProfile,
};

export default api;
