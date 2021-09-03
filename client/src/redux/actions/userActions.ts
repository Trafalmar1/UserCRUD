import api from "api";
import { UserData } from "api/userApi";
import { Action } from "redux/reducers/userReducer";
import { AppDispatch } from "redux/store";

export const GET_USERS = "GET_USERS";
export const LOADING = "LOADING";
export const GET_ONE_USER = "GET_ONE_USER";
export const GET_PROFILE_OWNER = "GET_PROFILE_OWNER";
export const DELETE_USER = "DELETE_USER";
export const GET_DASHBOARD = "GET_DASHBOARD";

const getUsersAction = (res: any): Action => ({
  type: GET_USERS,
  payload: { users: res.data, loading: false },
});

const getProfileOwnerAction = (res: any): Action => ({
  type: GET_PROFILE_OWNER,
  payload: { profileOwner: res.data },
});

const getLoggedInUserAction = (res: any): Action => ({
  type: GET_ONE_USER,
  payload: { user: res.data },
});

const deleteUserAction = (): Action => ({
  type: DELETE_USER,
  payload: { profileOwner: null },
});

const getDashboardAction = (res: any): Action => ({
  type: GET_DASHBOARD,
  payload: { dashboard: res.data },
});

export const getUsers = () => async (dispatch: AppDispatch) => {
  dispatch({ type: LOADING, payload: { loading: true } });
  try {
    const res = await api.getUsers();
    dispatch(getUsersAction(res));
  } catch (err) {
    console.log(err);
  }
};

export const getOneUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await api.getOneUser(id);
    dispatch(getLoggedInUserAction(res));
  } catch (err) {
    console.log(err);
  }
};

export const getProfileOwner =
  (id: string) => async (dispatch: AppDispatch) => {
    try {
      const res = await api.getOneUser(id);
      dispatch(getProfileOwnerAction(res));
    } catch (err) {
      console.log(err);
    }
  };

type Options = {
  isLoggedInUser?: boolean;
  callBack?: (res: string) => void;
};

export const updateUser =
  (data: UserData, options: Options) => async (dispatch: AppDispatch) => {
    const { isLoggedInUser, callBack } = options;
    try {
      const updated = await api.updateUser(data);
      const error = updated?.data?.error?.message;
      if (error) {
        if (callBack) callBack(error);
        return;
      }
      if (!data.id) return;
      const res = await api.getOneUser(data.id);
      dispatch(getProfileOwnerAction(res));
      if (callBack) callBack("success");
      if (isLoggedInUser) {
        dispatch(getLoggedInUserAction(res));
      }
    } catch (err) {
      console.error(err);
    }
  };

export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
  try {
    await api.deleteUser(id);
    dispatch(deleteUserAction());
  } catch (err) {
    console.error(err);
  }
};

export const getDashboard = () => async (dispatch: AppDispatch) => {
  try {
    const res = await api.getDashboard();
    dispatch(getDashboardAction(res));
  } catch (err) {
    console.error(err);
  }
};
