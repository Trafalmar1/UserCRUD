import { actions } from "redux/actions/userActions";

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
};

export type UserReducer = {
  loggedIn: boolean;
  user: User;
  users: User[];
  loading: boolean;
};

const initialState: UserReducer = {
  loggedIn: false,
  user: { id: "", username: "", email: "", role: "" },
  users: [],
  loading: false,
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actions.GET_USERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
