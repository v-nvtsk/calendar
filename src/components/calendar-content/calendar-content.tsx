import { useEffect } from "react";
import { TaskView } from "../../app/task";
import { dateToStringWithFormat, Views, VIEWS } from "../../helpers";
import { DayView } from "../day/day";
import MonthView from "../month/month";
import { TaskList } from "../task-list/task-list";
import { YearView } from "../year/year";

type CalendarContentProps = {
  items: any[];
  view: Views;
  onEdit: (id: string) => void;
  onCheck: (id: string, status: boolean) => void;
  setViewTitle: (title: string) => void;
  year: number;
  month: number;
  date: number;
};

export const CalendarContent = ({
  items,
  view,
  setViewTitle,
  onEdit,
  onCheck,
  year,
  month,
  date,
}: CalendarContentProps) => {
  if (typeof view !== "string" || VIEWS.includes(view) === false) return null;

  useEffect(() => {
    const title = dateToStringWithFormat({ name: view, year, month, date });
    setViewTitle(title);
    document.title = title ? `Calendar - ${title}` : `Calendar`;
  }, [view, year, month, date]);

  const views: Record<string, JSX.Element> = {
    year: <YearView year={year} tasks={items} />,
    month: <MonthView year={year} month={month} tasks={items} />,
    date: <DayView year={year} month={month} date={date} tasks={items} onEdit={onEdit} onCheck={onCheck} />,
    list: <TaskList onEdit={onEdit} tasks={items} />,
    task: <TaskView />,
  };
  const component = views[view];

  return <div className="calendar__content">{component}</div>;
};
