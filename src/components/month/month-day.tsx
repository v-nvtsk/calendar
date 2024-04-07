import { Link } from "react-router-dom";
import { TodoItem } from "../../api/calendar.types";
import { getToday } from "../../helpers";

type MonthDateListOptions = {
  year: number;
  month: number;
  dayFrom: number;
  dayTo: number;
  additionalClass?: string;
  tasks?: TodoItem[];
};
type PropsType = {
  options: MonthDateListOptions;
};

export const MonthDateList = ({ options }: PropsType) => {
  const { year, month, dayFrom, dayTo, additionalClass, tasks = [] } = options;
  const today = getToday();

  return Array.from({ length: dayTo - dayFrom + 1 }, (_, n) => {
    const day = dayFrom + n;
    const currentElementDate = new Date(year, month, day);

    const isToday = today === new Date(year, month, day).setHours(0, 0, 0, 0);
    const dateTasks = tasks.filter(
      (task) => new Date(task.startDate).setHours(0, 0, 0, 0) === currentElementDate.valueOf(),
    );
    const hasTasks = dateTasks.length > 0 ? " date_has-tasks" : "";
    const addClass = additionalClass ? ` ${additionalClass}` : "";
    const todayClass = isToday ? " date_current" : "";
    const className = `date${addClass}${hasTasks}${todayClass}`;

    return (
      <div
        className={className}
        key={currentElementDate.valueOf()}
        data-date={currentElementDate.valueOf()}
        data-tasks={dateTasks.length}
      >
        <Link to={`/calendar/date/?year=${year}&month=${month}&date=${day}`} className="date__link">
          {Intl.DateTimeFormat("en", { day: "numeric", month: "long" }).format(currentElementDate)}
        </Link>
        {dateTasks && (
          <ul>
            {dateTasks.map((task) => (
              <li className="date__task" key={task.id}>
                <Link to={`../task?id=${task.id}`} className="task__link">
                  {task.taskTitle}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  });
};
