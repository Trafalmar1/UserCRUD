import api from "api";
import { LoginData, SignInData } from "api/authApi";
import { AppDispatch } from "redux/store";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (data: SignInData) => async (dispatch: AppDispatch) => {
  dispatch({
    type: LOGIN,
    payload: {
      loggedIn: true,
      token: data.token,
      userId: data.userId,
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
    dispatch(logoutAction);
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
    autoLogout(remainingMilliseconds);
    dispatch(signInAction(res.token, res.userId));
  };

export const logout = () => (dispatch: AppDispatch) => {
  removeLocalStorage();
  dispatch(logoutAction);
};

const signInAction = (token: string, userId: string) => ({
  type: LOGIN,
  payload: {
    loggedIn: true,
    token: token,
    userId: userId,
  },
});

const logoutAction = {
  type: LOGOUT,
  payload: {
    loggedIn: false,
    token: "",
    userId: "",
    user: null,
  },
};
