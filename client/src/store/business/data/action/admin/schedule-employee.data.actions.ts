import { dataActionsEnum } from "../../state/data.types";
import API from "../../../../../models/axios/axios";
import { errorApi } from "../../../..";
import { Day } from "../../../../../models/system/day";
import { GeneralActionsEnum } from "../../../general/state/general.types";
import { falidBusineesDetailsErrorHandler } from "../../../general/action/index.actions";

// Put and Post

export const postEmployeeSchedule = (schedule: Day) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_BUSINESS_DETAILS });
      await API.post("business/details/hours", schedule);

      dispatch({
        type: dataActionsEnum.SUCCESS_POST_EMPLOYEE_SCHEDULE,
        schedule,
      });

      dispatch({ type: GeneralActionsEnum.SUCCESS_DATA });
      return;
    } catch (error) {
      falidBusineesDetailsErrorHandler(dispatch, error);
    }
  };
};
