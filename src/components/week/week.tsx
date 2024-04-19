import { Link } from "react-router-dom";
import { TodoItem } from "../../api/calendar.types";
import { DAY_MS, dateToStringWithFormat, getFirstDayOfWeekByNumber } from "../../helpers";
import styles from "./styles.module.css";

type PropType = {
  year: number;
  week: number;
  tasks: TodoItem[];
};
export function WeekView({ year, week, tasks }: PropType) {
  const firstDate = getFirstDayOfWeekByNumber(`${year}-W${week}`);

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = firstDate + DAY_MS * i;
    return {
      date,
      tasks: tasks.filter((el) => el.startDate >= date && el.startDate < date + DAY_MS - 1),
    };
  });

  return (
    <div className={styles.week}>
      {weekDays.map((el) => {
        const d = new Date(el.date);

        const title = `${["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"][d.getDay()]}, ${dateToStringWithFormat({ name: "date", date: d.getDate(), month: d.getMonth(), year: d.getFullYear() })}`;
        return (
          <div key={el.date} className={styles.weekDay}>
            <Link className={styles.link} to={`/calendar/date?year=${year}&month=${d.getMonth()}&date=${d.getDate()}`}>
              <div className={styles.title}>{title}</div>
            </Link>
            <ul className={styles.taskList}>
              {el.tasks.map((task) => (
                <li className={styles.task} key={task.id}>
                  <Link className={styles.link} to={`/task/view?id=${task.id}`}>
                    <div className={styles.taskContent}>
                      <p className={styles.taskTitle}>{task.taskTitle}</p>
                      {task.description && <div className={styles.divider} />}
                      <p className={styles.description}>{task.description.substring(0, 30)}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
