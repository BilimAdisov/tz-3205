import { format, isBefore, startOfDay } from "date-fns";

const ReformatDate = (dateString: Date, hour?: true) => {
  const date = new Date(dateString);

  if (!isValidDate(date)) {
    return null;
  }

  return format(date, hour ? "dd.MM.yyyy - HH:mm" : "dd.MM.yyyy");
};

function isValidDate(date: any) {
  return date instanceof Date && !isNaN(date.valueOf());
}

const isDateExpired = (dateToCheck: Date | null, referenceDate: Date) => {
  if (!dateToCheck) {
    return false;
  }
  const startOfDateToCheck = startOfDay(dateToCheck);
  const startOfReferenceDate = startOfDay(referenceDate);

  return isBefore(startOfDateToCheck, startOfReferenceDate);
};

export { ReformatDate, isDateExpired };
