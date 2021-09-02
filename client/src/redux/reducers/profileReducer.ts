type Profile = {
  name: string;
  city: string;
  birthday: Date;
  gender: "male" | "female";
};

type State = {
  profiles: Profile[];
};

type Action = {
  type: string;
  payload: {
    profiles?: Profile[];
  };
};

const initialState: State = {
  profiles: [],
};

export const profileReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
