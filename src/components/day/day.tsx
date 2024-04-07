import { useCallback } from "react";
import { TodoItem } from "../../api/calendar.types";
import { checkIsToday } from "../../helpers";
import { HoursList } from "../hours-list/hours-list";
import { TaskItem } from "../task-item/task-item";
import styles from "./style.module.css";

type PropsType = {
  year: number;
  month: number;
  date: number;
  tasks: TodoItem[];
  onEdit: (id: string) => void;
  onCheck: (id: string, status: boolean) => void;
};

export function DayView({ tasks, onEdit, onCheck, year, month, date }: PropsType) {
  const currenthour = document.querySelector("#currentHour");
  if (currenthour) setTimeout(() => currenthour.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

  const renderItem = useCallback(
    (task: TodoItem) => (
      <TaskItem key={task.id} itemData={task} onEdit={onEdit} onDelete={() => {}} onCheck={onCheck} />
    ),
    [onEdit],
  );

  return (
    <div className={styles.day}>
      {<HoursList tasks={tasks} renderItem={renderItem} isToday={checkIsToday({ year, month, date })} />}
    </div>
  );
}
