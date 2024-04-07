import { TodoItem } from "../../api/calendar.types";
import { groupTasksByHour } from "../../helpers";
import styles from "./style.module.css";

type PropsType<T> = {
  tasks: T[];
  isToday: boolean;
  renderItem: (task: T) => JSX.Element;
};

export function HoursList<T>(props: PropsType<T>): JSX.Element;

export function HoursList({ tasks, renderItem, isToday }: PropsType<TodoItem>) {
  const tasksByHour = groupTasksByHour(tasks);

  return (
    <ul className={styles.hours}>
      {Array.from({ length: 24 }, (_, hour) => {
        const currentHour = isToday && new Date().getHours() === hour ? "currentHour" : "";
        return (
          <li key={hour} id={currentHour} className={[styles.hour, styles[currentHour]].join(" ")}>
            <div className={styles.hourTitle}>{`${String(hour).padStart(2, "0")}:00`}</div>
            <div>
              <ul className={styles.tasks}>
                {tasksByHour[hour] && tasksByHour[hour].map((task: TodoItem) => renderItem(task))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
