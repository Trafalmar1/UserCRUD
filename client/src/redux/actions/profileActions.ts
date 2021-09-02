import api from "api";
import { ProfileData } from "api/profileApi";
import { Action, Profile } from "redux/reducers/profileReducer";
import { AppDispatch } from "redux/store";

export const GET_PROFILES = "GET_PROFILES";

const getProfilesAction = (profiles: Profile[]): Action => ({
  type: GET_PROFILES,
  payload: {
    profiles,
  },
});

export const getProfiles = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.getProfiles();
    const profiles: Profile[] = res.data as Profile[];
    dispatch(getProfilesAction(profiles));
  } catch (err) {
    console.error(err);
  }
};

export const createProfile =
  (data: ProfileData, callback?: (res: string) => void) =>
  async (dispatch: AppDispatch) => {
    try {
      await api.createProfile(data);
      const res = await api.getProfiles();
      const profiles: Profile[] = res.data as Profile[];
      if (callback) {
        callback("success");
      }
      dispatch(getProfilesAction(profiles));
    } catch (err) {
      console.error(err);
    }
  };

export const deleteProfile = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await api.deleteProfile(id);
    const res = await api.getProfiles();
    const profiles: Profile[] = res.data as Profile[];
    dispatch(getProfilesAction(profiles));
  } catch (err) {
    console.error(err);
  }
};
