import { checkValidity } from "./validator.input";
import { updateObject } from "../../../../assets/utility/utility";

export const inputChanged = (form: any, e: any, inputIdentifier: any) => {
  if (!form[inputIdentifier].editable) return false;
  const updatedFormElement = updateObject(form[inputIdentifier], {
    value: e.target.value,
    error: checkValidity(e.target.value, form[inputIdentifier].validation),
    touched: true,
  });
  const updatedForm = updateObject(form, {
    [inputIdentifier]: updatedFormElement,
  });

  const formIsValid = Object.keys(updatedForm).every((e) => {
    if (updatedForm[e].error.length > 0) return false;
    return true;
  });

  return { updatedForm, formIsValid };
};
