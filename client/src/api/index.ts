import { getUsers, getOneUser, updateUser, deleteUser } from "./userApi";
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
  deleteUser,
  signUp,
  signIn,
  getOneUser,
  getProfiles,
  createProfile,
  deleteProfile,
  updateProfile,
};

export default api;
