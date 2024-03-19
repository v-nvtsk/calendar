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
  id?: string;
  [key: string]: any;
};

export function generatePathname({ newView, year, month, date, id }: GetPathArgs): string {
  const pathnames: Pathnames = {
    year: `/calendar/${newView}?year=${year}`,
    month: `/calendar/${newView}?year=${year}&month=${month}`,
    date: `/calendar/${newView}?year=${year}&month=${month}&date=${date}`,
    week: `/calendar/${newView}?year=${year}&month=${month}&date=${date}`,
    list: `/calendar/${newView}?year=${year}&month=${month}&date=${date}`,
    task: `/../${newView}?id=${id}`,
  };
  return pathnames[newView];
}
