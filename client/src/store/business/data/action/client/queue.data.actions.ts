import { Queue } from "./../../../../../models/system/event";
import { ServiceListQueue } from "../../../../../models/system/service";
import { dataActionsEnum } from "../../state/data.types";
import API from "../../../../../models/axios/axios";

import { GeneralActionsEnum } from "../../../general/state/general.types";
import { falidQueueErrorHandler } from "../../../general/action/index.actions";

export const setServiceToQueue = (servicesList: ServiceListQueue) => {
  return async (dispatch: any) => {
    try {
      dispatch({ type: GeneralActionsEnum.START_QUEUE });
      const res = await API.post(
        localStorage.getItem("domain") + "/calendar/setServiceToQueue",
        servicesList
      );
      const mat = res.data.mat;
      const days = res.data.days;
      const startMinTime = res.data.startMinTime;
      const timeDistance = res.data.timeDistance;
      const durationOfNewQueue = res.data.durationOfNewQueue;
      const price = res.data.price;

      dispatch({
        type: dataActionsEnum.SUCCESS_SET_CALENDAR,
        mat,
        days,
        durationOfNewQueue,
        startMinTime,
        timeDistance,
        price,
      });

      dispatch({ type: GeneralActionsEnum.SUCCESS_QUEUE });
      return;
    } catch (error) {
      falidQueueErrorHandler(dispatch, error);
    }
  };
};

export const updateScheduleWeek = (queue: Queue) => {
  return async (dispatch: any) => {
    try {
      console.log(queue);

      dispatch({ type: GeneralActionsEnum.START_QUEUE });
      const res = await API.post(
        localStorage.getItem("domain") + "/calendar",
        queue
      );
      dispatch({
        type: dataActionsEnum.UPDATE_MATRIX,
        queue,
      });
      console.log(res.data);
      return dispatch({
        type: GeneralActionsEnum.SUCCESS_QUEUE,
      });
    } catch (error) {
      falidQueueErrorHandler(dispatch, error);
    }
  };
};
