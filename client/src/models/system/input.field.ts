export type InputField = {
  elementType: string;
  elementConfig: {
    type: string;
    placeholder?: string;
  };
  value: string | number;
  label: string;
  name: string;
  validation: any;
  valid: boolean;
  touched: boolean;
  style?: any;
  error: string;
  editable: boolean;
  class: string;
};

export type Form = {
  [type: string]: InputField;
};
