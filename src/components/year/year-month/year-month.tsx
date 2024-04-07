import { Link } from "react-router-dom";
import { TodoItem } from "../../../api/calendar.types";
import { daysInMonth } from "../../../helpers";
import YearDate from "./year-date";

type MonthOptions = {
  year: number;
  month: number;
  dayFrom: number;
  dayTo: number;
  addtitionalClass: string;
  tasks?: TodoItem[];
};

function generateMonthPart(options: MonthOptions) {
  const { year, month, dayFrom, dayTo, addtitionalClass, tasks } = options;
  return Array.from({ length: dayTo - dayFrom + 1 }, (_, n) => {
    const day = dayFrom + n;
    return (
      <YearDate
        key={`${year}-${month}-${day}`}
        year={year}
        month={month}
        day={day}
        addtitionalClass={addtitionalClass}
        tasks={tasks}
      />
    );
  });
}

type PropType = {
  elementDate: Date;
  year: number;
  month: number;
  tasks: TodoItem[];
};
export const YearMonth = ({ elementDate, year, month, tasks = [] }: PropType) => {
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();

  const WeekHeaders = ["Mn", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((weekDay) => (
    <div className="year__month-weekday" key={weekDay}>
      {weekDay}
    </div>
  ));

  const monthFormat = Intl.DateTimeFormat("en", { month: "long" });
  const monthFirstWeekday = (elementDate.getDay() + 6) % 7;

  let prevYear = year;
  let prevMonth = month - 1;
  if (prevMonth < 0) {
    prevYear = year - 1;
    prevMonth = 11;
  }
  const daysInPrevMonth = daysInMonth(prevMonth, prevYear);
  const prevMonthOptions = {
    year: prevYear,
    month: prevMonth,
    dayFrom: daysInPrevMonth - (monthFirstWeekday - 1),
    dayTo: daysInPrevMonth,
    addtitionalClass: "year__month-day_prev-month",
  };

  const PrevMonthDays = generateMonthPart(prevMonthOptions);

  const CurrMonthDays = generateMonthPart({
    year,
    month,
    dayFrom: 1,
    dayTo: daysInMonth(month, year),
    addtitionalClass: "",
    tasks,
  });

  let nextYear = year;
  let nextMonth = month + 1;
  if (nextMonth > 11) {
    nextYear = year + 1;
    nextMonth = 0;
  }

  let lastWeekLength = (PrevMonthDays.length + CurrMonthDays.length) % 7;
  if (lastWeekLength === 0) lastWeekLength = 7;

  const nextMonthOptions = {
    year: nextYear,
    month: nextMonth,
    dayFrom: 1,
    dayTo: 7 - lastWeekLength,
    addtitionalClass: "year__month-day_next-month",
  };

  const NextMonthDays = generateMonthPart(nextMonthOptions);

  const isCurrentMonthClass = thisYear === year && thisMonth === month ? "current" : "";

  return (
    <div className="year__month" key={`${year}-${month}`} data-date={elementDate.valueOf()} data-tasks={tasks.length}>
      <Link to={`/calendar/month?year=${year}&month=${month}`} className={`year__month-title ${isCurrentMonthClass}`}>
        {monthFormat.format(elementDate)}
      </Link>
      <div className="year__month-weekdays">{WeekHeaders}</div>
      <div className="year__month-days">
        {PrevMonthDays}
        {CurrMonthDays}
        {NextMonthDays}
      </div>
    </div>
  );
};
