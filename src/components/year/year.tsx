import { TodoItem } from "../../api/calendar.types";
import "./style.css";
import { YearMonth } from "./year-month/year-month";

type YearProps = {
  year: number;
  tasks: TodoItem[];
};

export function YearView({ year, tasks = [] }: YearProps) {
  const monthList = Array.from({ length: 12 }, (_, month) => {
    const elementDate = new Date(year, month, 1);
    return <YearMonth key={elementDate.valueOf()} elementDate={elementDate} year={year} month={month} tasks={tasks} />;
  });

  return <div className="year">{monthList}</div>;
}
