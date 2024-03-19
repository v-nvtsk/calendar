import { useEffect } from "react";
import { Task } from "../../app/task";
import { dateToStringWithFormat, Views } from "../../helpers";
import { DayView } from "../day/day";
import MonthView from "../month/month";
import { TaskList } from "../task-list/task-list";
import { WeekView } from "../week/week";
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
  week: number;
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
  week,
}: CalendarContentProps) => {
  useEffect(() => {
    const title = dateToStringWithFormat({ name: view, year, month, date, week });
    setViewTitle(title);
    document.title = title ? `Calendar - ${title}` : `Calendar`;
  }, [view, year, month, date]);

  const views: Record<string, JSX.Element> = {
    year: <YearView year={year} tasks={items} />,
    month: <MonthView year={year} month={month} tasks={items} />,
    date: <DayView year={year} month={month} date={date} tasks={items} onEdit={onEdit} onCheck={onCheck} />,
    list: <TaskList onEdit={onEdit} tasks={items} />,
    task: <Task />,
    week: <WeekView year={year} week={week} tasks={items} />,
  };
  const component = views[view];

  return <div className="calendar__content">{component}</div>;
};
