import { dataActionsEnum } from "../../data.types";
import API from "../../../../../models/axios/axios";
import { BusinessDetails } from "../../../../../models/system/business-details";
import { GeneralActionsEnum } from "../../../general/general.types";
import { falidBusineesDetailsErrorHandler } from "../../../general/action/index.actions";

// Put and Post

export const postBusinessDetails = (form: BusinessDetails) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_BUSINESS_DETAILS });
      await API.post("business/details", form);
      dispatch({
        type: dataActionsEnum.SUCCESS_POST_BUSINESS_DETAILS,
        business: form,
      });
      dispatch({ type: GeneralActionsEnum.SUCCESS_DATA });
      return;
    } catch (error) {
      falidBusineesDetailsErrorHandler(dispatch, error);
    }
  };
};
