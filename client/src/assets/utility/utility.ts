export { ArrowNext } from "./icont";

export const updateObject = (oldObject: any, updatedProperties: any) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const hoursArray = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];

export const FullHebDays = [
  "ראשון",
  "שני",
  "שלישי",
  "רביעי",
  "חמישי",
  "שישי",
  "שבת",
];
export const shortenedHebDays = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
export const FullEngDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
export const monthHebToEng = (month: string) => {
  switch (month) {
    case "ינואר":
      return "January";
    case "פבואר":
      return "February";
    case "מרץ":
      return "March";
    case "אפריל":
      return "May";
    case "מאי":
      return "May";
    case "יוני":
      return "June";
    case "יולי":
      return "July";
    case "אוגוסט":
      return "August";
    case "ספטמבר":
      return "September";
    case "אוקטובר":
      return "October";
    case "נובמבר":
      return "November";
    case "דצמבר":
      return "December";
  }
};
export const monthNumberToHeb = (month: number): string => {
  switch (month) {
    case 1:
      return "ינואר";
    case 2:
      return "פבואר";
    case 3:
      return "מרץ";
    case 4:
      return "אפריל";
    case 5:
      return "מאי";
    case 6:
      return "יוני";
    case 7:
      return "יולי";
    case 8:
      return "אוגוסט";
    case 9:
      return "ספטמבר";
    case 10:
      return "אוקטובר";
    case 11:
      return "נובמבר";
    default:
      return "דצמבר";
  }
};
