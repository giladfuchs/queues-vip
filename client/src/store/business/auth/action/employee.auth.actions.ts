import { AuthActionsEnum } from "../auth.types";
import API from "../../../../models/axios/axios";
import { GeneralActionsEnum } from "../../general/general.types";
import { Employee } from "../../../../models/system/persones";
import { falidAuthErrorHandler } from "../../general/action/index.actions";

export const getAllDomains = () => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });
      const res = await API.get("business/auth/check");
      const domains = res.data.domains;
      dispatch({ type: AuthActionsEnum.SET_DOMAINS, domains });
      dispatch({ type: GeneralActionsEnum.SUCCESS_AUTH });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};
export const registerFirstEmployee = (employee: Employee) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post("business/auth/first-register", employee);
      const details = { ...res.data.employee, firstName: res.data.authPass };
      delete details._id;
      const person = { _id: res.data.employee._id, details };

      dispatch({
        type: AuthActionsEnum.SET_PERSON,
        person,
      });
      dispatch({ type: GeneralActionsEnum.INCREMENT });

      dispatch({ type: GeneralActionsEnum.SUCCESS_AUTH });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};
export const aprroveRegisterFirstEmployee = (authPass: any) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post(
        "business/auth/approve-first-register",
        authPass
      );
      const token = res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", "true");

      dispatch({ type: GeneralActionsEnum.INCREMENT });
      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const loginEmployee = (form: { phone: string; password: string }) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });

      const res = await API.post("business/auth/login", form);

      const token = res.data.token;
      const domain = res.data.domain;

      localStorage.setItem("token", token);
      localStorage.setItem("domain", domain);
      localStorage.setItem("isAdmin", "true");

      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });

      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const resetPasswordEmployee = (phone: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });
      const res = await API.post("business/auth/sendResetMessage", { phone });
      console.log(res.data.token);

      return dispatch({ type: GeneralActionsEnum.SUCCESS_SEND_TOKEN_MSG });
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

export const setNewPasswordEmployee = (password: string, token: string) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_AUTH });
      const res = await API.post(
        "business/auth/resetPassword/" + token,
        password
      );

      const domain = res.data.domain;
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("domain", domain);
      localStorage.setItem("isAdmin", "true");

      dispatch({ type: GeneralActionsEnum.SUCCESS_SET_TOKEN });
      return;
    } catch (error) {
      falidAuthErrorHandler(dispatch, error);
    }
  };
};

// export const registerEmployee = (employee: Employee) => {
//   return async (dispatch: any) => {
//     try {
//       dispatch({ type: GeneralActionsEnum.START_AUTH });

//       const res = await API.post("business/auth/register", employee);

//       const token = res.data.token;
//       localStorage.setItem("token", token);
//       localStorage.setItem("isAdmin", "true");

//       dispatch({ type: GeneralActionsEnum.SUCCESS_EMPLOYEE_LOGIN_AUTH });
//     } catch (error) {
//       falidAuthDetailsErrorHandler(dispatch, error);
//     }
//   };
// };
