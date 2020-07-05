import { AuthActionsEnum } from "../auth.types";
import API from "../../../../models/axios/axios";

import { GeneralActionsEnum } from "../../general/general.types";
import { Client } from "../../../../models/system/persones";
import { falidAuthErrorHandler } from "../../general/action/index.actions";

export const registerDomainClient = (client: Client, domain: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post(domain + "/auth/register", client);
      localStorage.clear();
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("domain", domain);
      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const loginDomainClient = (domain: string, phone: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post(domain + "/auth/login", { phone });

      const token = res.data.token;
      localStorage.clear();
      localStorage.setItem("token", token);
      localStorage.setItem("domain", domain);

      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const checkDomainIsValid = (domain: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });
      await API.get(domain + "/check");
      localStorage.setItem("url", domain);
      dispatch({ type: AuthActionsEnum.DOMAIN_IS_VALID });
      dispatch({ type: GeneralActionsEnum.SUCCESS_AUTH });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};
