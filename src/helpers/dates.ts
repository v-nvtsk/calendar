/**
 * Returns the current date as an object with year, month, and date properties.
 *
 * @return {Object} An object with year, month, and date properties.
 */
export function getTodayAsObject() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    date: now.getDate(),
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
  };
}

export function getToday() {
  return new Date().setHours(0, 0, 0, 0);
}

export function printDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function printDateTime(date: Date) {
  return Intl.DateTimeFormat("en", { dateStyle: "short", timeStyle: "short" }).format(date);
}

/**
 * Converts a given date to a string in the format "YYYY-MM-DD".
 *
 * @param {number | undefined} date - The date to be converted. If undefined, an empty string is returned.
 * @return {string} The converted date string in the format "YYYY-MM-DD".
 */
export function dateToInputValue(date: number | undefined) {
  if (!date) return "";
  let newDate: Date;
  if (typeof date === "string") newDate = new Date(Number(date));
  else newDate = new Date(date);
  const y = String(newDate.getFullYear()).padStart(4, "0");
  const m = String(newDate.getMonth() + 1).padStart(2, "0");
  const d = String(newDate.getDate()).padStart(2, "0");

  return `${y}-${m}-${d}`;
}

/**
 * Generates a date object from the input value.
 * generated date is not a Date object but a number
 * of milliseconds since January 1, 1970
 *
 * @param {string} value - the input value in the format "YYYY-MM-DD"
 * @return {number} the generated date object
 */
export function dateFromInputValue(value: string = "") {
  const dateParts = value.split("-");
  const year = Number(dateParts[0]);
  const month = Number(dateParts[1]) - 1;
  const day = Number(dateParts[2]);

  const date = new Date(year, month, day).setHours(0, 0, 0, 0);
  return date;
}

type DateType = {
  year: number;
  month: number;
  date: number;
};

export function checkIsToday<T extends Date | DateType>(date: T): boolean {
  const today = getToday();
  const inputDate = date instanceof Date ? date : new Date(date.year, date.month, date.date);
  return today === inputDate.setHours(0, 0, 0, 0);
}

export function dateTimeLocaltoInput(date: Date) {
  const result = `${dateToInputValue(date.getTime())}T${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  return result;
}
