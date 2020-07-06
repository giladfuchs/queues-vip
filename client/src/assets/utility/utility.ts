import { TiArrowBackOutline } from "react-icons/ti";

export const ArrowNext = TiArrowBackOutline;
export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};
