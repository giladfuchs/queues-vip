import { combineReducers } from "redux";
import { authReducer } from "./business/auth/reducer/index.auth.reducer";
import { dataReducer } from "./business/data/reducer/index.data.reducer";
import { generalReducer } from "./business/general/reducer/index.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  general: generalReducer,
});

export const errorApi = (error: {
  response: { data?: { message?: string } };
  message: string;
}) =>
  error.response && error.response.data
    ? error.response.data.message
    : error.message;

export * from "./business/auth/index";
export * from "./business/data/index";
export * from "./business/general/index";
