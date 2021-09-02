import { GET_USERS, GET_ONE_USER } from "redux/actions/userActions";
import { LOGIN, LOGOUT } from "redux/actions/authActions";

type Profile = { id: string };

export type User = {
  id: string;
  username: string;
  email: string;
  role: string;
  profiles: Profile[];
};

export type UserReducer = {
  loggedIn: boolean;
  token: string;
  user: User | null;
  users: User[];
  loading: boolean;
  userId: string;
};

export type Action = {
  type: string;
  payload: {
    loggedIn?: boolean;
    token?: string;
    user?: User | null;
    users?: User[];
    loading?: boolean;
    userId?: string;
  };
};

const initialState: UserReducer = {
  loggedIn: false,
  token: "",
  user: null,
  users: [],
  loading: false,
  userId: "",
};

export const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload.users,
        loading: action.payload.loading,
      };
    case GET_ONE_USER:
      return { ...state, user: action.payload.user };
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        token: action.payload.token,
        userId: action.payload.userId,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
