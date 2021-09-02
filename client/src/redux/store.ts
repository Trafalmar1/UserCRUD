import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userReducer } from "./reducers/userReducer";
import { profileReducer } from "./reducers/profileReducer";

const middleWare = applyMiddleware(thunkMiddleware);
const rootReducer = combineReducers({
  user: userReducer,
  profiles: profileReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(middleWare));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
