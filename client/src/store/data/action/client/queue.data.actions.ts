import { Queue, API, ServiceListQueue } from "../../../../models";
import { dataActionsEnum } from "../..";

import { GeneralActionsEnum, falidQueueErrorHandler } from "../../../general";

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
      dispatch({ type: GeneralActionsEnum.START_QUEUE });
      const res = await API.post(
        localStorage.getItem("domain") + "/calendar",
        queue
      );
      dispatch({
        type: dataActionsEnum.UPDATE_MATRIX,
        queue,
      });
      return dispatch({
        type: GeneralActionsEnum.SUCCESS_QUEUE,
      });
    } catch (error) {
      falidQueueErrorHandler(dispatch, error);
    }
  };
};
