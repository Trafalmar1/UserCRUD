import { getUsers, getOneUser } from "./userApi";
import { signUp, signIn } from "./authApi";
import { getProfiles, createProfile, deleteProfile } from "./profileApi";

const api = {
  getUsers,
  signUp,
  signIn,
  getOneUser,
  getProfiles,
  createProfile,
  deleteProfile,
};

export default api;
