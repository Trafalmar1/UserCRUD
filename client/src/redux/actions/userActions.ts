import { AppDispatch } from "redux/store";
import api from "api";

export const actions = {
  GET_USERS: "GET_USERS",
  LOADING: "LOADING",
};

export const getUsers = () => async (dispatch: AppDispatch) => {
  dispatch({ type: actions.LOADING, payload: { loading: true } });
  const res = await api.getUsers();
  dispatch({
    type: actions.GET_USERS,
    payload: { users: res.data, loading: false },
  });
};
