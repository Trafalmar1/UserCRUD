import { GET_PROFILES } from "redux/actions/profileActions";

export type Profile = {
  id: string;
  name: string;
  city: string;
  birthday: string;
  userId: string;
  createdAt?: string;
  gender: "male" | "female";
};

export type ProfileReducer = {
  profiles: Profile[];
};

export type Action = {
  type: string;
  payload: {
    profiles?: Profile[];
  };
};

const initialState: ProfileReducer = {
  profiles: [],
};

export const profileReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case GET_PROFILES:
      return { ...state, profiles: action.payload.profiles };
    default:
      return state;
  }
};
