/**
 * Calculate the number of days in the specified month and year.
 *
 * @param {number} month - The month (zero-based) for which to calculate the number of days
 * @param {number} year - The year for which to calculate the number of days
 * @return {number} The number of days in the specified month and year
 */
export function daysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}
