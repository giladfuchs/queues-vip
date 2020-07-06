import * as actions from "../state/auth.types";
import { updateObject } from "../../../../assets/utility/utility";

export const domainIsValid = (state: actions.AuthState) => {
  return updateObject(state, {
    isValidDomain: true,
  });
};
