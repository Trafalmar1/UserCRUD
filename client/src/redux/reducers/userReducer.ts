import {
  GET_USERS,
  GET_ONE_USER,
  GET_PROFILE_OWNER,
  DELETE_USER,
} from "redux/actions/userActions";
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
  profileOwner: User | null;
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
    profileOwner?: User | null;
  };
};

const initialState: UserReducer = {
  loggedIn: false,
  token: "",
  user: null,
  users: [],
  loading: false,
  userId: "",
  profileOwner: null,
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
    case GET_PROFILE_OWNER:
      return { ...state, profileOwner: action.payload.profileOwner };
    case DELETE_USER:
      return { ...state, profileOwner: action.payload.profileOwner };
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
