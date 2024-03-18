type Options = {
  name: string | undefined;
  year?: number;
  month?: number;
  date?: number;
};

export function dateToStringWithFormat({ name, year = new Date().getFullYear(), month = 0, date = 1 }: Options) {
  let dateOptions = {};

  switch (name) {
    case "year":
      dateOptions = { year: "numeric" };
      break;
    case "month":
      dateOptions = { month: "long", year: "numeric" };
      break;
    case "date":
      dateOptions = { month: "long", year: "numeric", day: "numeric" };
      break;
    default:
      return "";
  }

  return Intl.DateTimeFormat("en", dateOptions).format(new Date(year, month, date));
}
