import { AppDispatch } from "redux/store";
import api from "api";
import { LoginData, SignInData } from "api/authApi";

export const actions = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

export const login = (data: SignInData) => async (dispatch: AppDispatch) => {
  dispatch({
    type: actions.LOGIN,
    payload: {
      loggedIn: true,
      token: data.token,
    },
  });
};

const removeLocalStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expiryDate");
  localStorage.removeItem("userId");
};

const autoLogout = (ms: number) => (dispatch: AppDispatch) => {
  setTimeout(() => {
    dispatch(logout());
    removeLocalStorage();
  }, ms);
};

export const signIn =
  (data: LoginData, callBack?: (res: string) => void) =>
  async (dispatch: AppDispatch) => {
    const res: SignInData = await api.signIn(data);
    if (!res || !res.token || !res.userId) {
      if (callBack) callBack("error");
      return;
    }
    if (callBack) callBack("success");
    localStorage.setItem("token", res.token);
    localStorage.setItem("userId", res.userId);
    const remainingMilliseconds = 60 * 60 * 1000 * 24 * 10;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    dispatch(autoLogout(remainingMilliseconds));
    dispatch({
      type: actions.LOGIN,
      payload: {
        loggedIn: true,
        token: res.token,
      },
    });
  };

export const logout = () => (dispatch: AppDispatch) => {
  removeLocalStorage();
  dispatch({
    type: actions.LOGOUT,
    payload: {
      loggedIn: false,
      token: "",
    },
  });
};
