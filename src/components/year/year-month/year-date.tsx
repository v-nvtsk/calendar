import { Link } from "react-router-dom";
import { TodoItem } from "../../../api/calendar.types";
import { getToday } from "../../../helpers";

type PropsType = { year: number; month: number; day: number; addtitionalClass?: string; tasks?: TodoItem[] };

function YearDate({ year, month, day, addtitionalClass, tasks = [] }: PropsType) {
  const today = getToday();
  let hasTasks = "";
  if (
    tasks?.find((task) => {
      const currDate = new Date(task.startDate).setHours(0, 0, 0, 0);
      return currDate === new Date(year, month, day).setHours(0, 0, 0, 0);
    })
  ) {
    hasTasks += " year__month-day_has-tasks";
  }
  const isToday = today === new Date(year, month, day).setHours(0, 0, 0, 0);
  return (
    <Link
      to={`/calendar/date?year=${year}&month=${month}&date=${day}`}
      className={`year__month-day ${hasTasks} ${addtitionalClass} ${isToday ? "year__month-day_current" : ""}`}
      key={`${year}- ${month} -${day} `}
    >
      {day}
    </Link>
  );
}

export default YearDate;
