import { getWeekNumber } from "./week";

export type Views = "year" | "month" | "week" | "date" | "list" | "task";
export const VIEWS: Views[] = ["year", "month", "week", "date", "list"];
export type Pathnames = {
  year: string;
  month: string;
  date: string;
  list: string;
  week: string;
  task: string;
  [key: string]: string;
};

export type GetPathArgs = {
  newView: string;
  year: number;
  month: number;
  date: number;
  week?: number;
  id?: string;
  [key: string]: any;
};

export function generatePathname({ newView, year, month, date, week, id }: GetPathArgs): string {
  const pathnames: Pathnames = {
    year: `/calendar/${newView}?year=${year}`,
    month: `/calendar/${newView}?year=${year}&month=${month}`,
    date: `/calendar/${newView}?year=${year}&month=${month}&date=${date}`,
    week: `/calendar/${newView}?year=${year}&week=${week || getWeekNumber(new Date(year, month, date).getTime())[1]}`,
    list: `/calendar/${newView}?year=${year}&month=${month}&date=${date}`,
    task: `/../${newView}/view?id=${id}`,
  };
  return pathnames[newView];
}
