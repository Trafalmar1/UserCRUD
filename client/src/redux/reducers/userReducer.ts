import { actions } from "redux/actions/userActions";
import { actions as authActions } from "redux/actions/authActions";

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type UserReducer = {
  loggedIn: boolean;
  token: string;
  user: User;
  users: User[];
  loading: boolean;
};

const initialState: UserReducer = {
  loggedIn: false,
  token: "",
  user: { id: "", username: "", email: "", role: "" },
  users: [],
  loading: false,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_USERS:
      return { ...state, ...action.payload };
    case authActions.LOGIN:
      return { ...state, ...action.payload };
    case authActions.LOGOUT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
