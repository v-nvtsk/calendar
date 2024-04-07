import { TodoItem } from "../../api/calendar.types";
import { daysInMonth } from "../../helpers";
import { MonthDateList } from "./month-day";
import "./style.css";

type PropType = {
  year: number;
  month: number;
  tasks: TodoItem[];
};

function MonthView({ year, month, tasks }: PropType) {
  const elementDate = new Date(year, month, 1);

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
    additionalClass: "year__month-day_prev-month",
  };

  const currMonthOptions = {
    year,
    month,
    dayFrom: 1,
    dayTo: daysInMonth(month, year),
    additionalClass: "",
    tasks,
  };

  let nextYear = year;
  let nextMonth = month + 1;
  if (nextMonth > 11) {
    nextYear = year + 1;
    nextMonth = 0;
  }

  const lastWeekLength = (prevMonthOptions.dayTo - prevMonthOptions.dayFrom + daysInMonth(month, year) + 1) % 7;

  const nextMonthOptions = {
    year: nextYear,
    month: nextMonth,
    dayFrom: 1,
    dayTo: 7 - lastWeekLength,
    additionalClass: "year__month-day_next-month",
  };

  return (
    <div className="month">
      <MonthDateList options={prevMonthOptions} />
      <MonthDateList options={currMonthOptions} />
      {lastWeekLength && <MonthDateList options={nextMonthOptions} />}
    </div>
  );
}

export default MonthView;
