import api from "api";
import { AppDispatch } from "redux/store";

export const GET_USERS = "GET_USERS";
export const LOADING = "LOADING";
export const GET_ONE_USER = "GET_ONE_USER";
export const GET_PROFILE_OWNER = "GET_PROFILE_OWNER";

export const getUsers = () => async (dispatch: AppDispatch) => {
  dispatch({ type: LOADING, payload: { loading: true } });
  try {
    const res = await api.getUsers();
    dispatch({
      type: GET_USERS,
      payload: { users: res.data, loading: false },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOneUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.getOneUser(id);
    dispatch({
      type: GET_ONE_USER,
      payload: { user: res.data },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProfileOwner =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.getOneUser(id);
      dispatch({
        type: GET_PROFILE_OWNER,
        payload: { profileOwner: res.data },
      });
    } catch (err) {
      console.log(err);
    }
  };
