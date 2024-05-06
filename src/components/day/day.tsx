import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TodoItem } from "../../api/calendar.types";
import { checkIsToday } from "../../helpers";
import { deleteTask } from "../../store/calendarSlice";
import { HoursList } from "../hours-list/hours-list";
import { TaskItem } from "../task-item/task-item";
import styles from "./style.module.css";
import { AppDispatch } from "../../store";

type PropsType = {
  year: number;
  month: number;
  date: number;
  tasks: TodoItem[];
  onEdit: (id: string) => void;
  onCheck: (id: string, status: boolean) => void;
};

export function DayView({ tasks, onEdit, onCheck, year, month, date }: PropsType) {
  const dispatch = useDispatch<AppDispatch>();
  const currenthour = document.querySelector("#currentHour");
  if (currenthour) setTimeout(() => currenthour.scrollIntoView({ behavior: "smooth", block: "start" }), 100);

  const callbacks = {
    onDelete: useCallback((id: string) => {
      dispatch(deleteTask(id));
    }, []),
  };

  const renderItem = useCallback(
    (task: TodoItem) => (
      <TaskItem key={task.id} itemData={task} onEdit={onEdit} onDelete={callbacks.onDelete} onCheck={onCheck} />
    ),
    [onEdit],
  );

  return (
    <div className={styles.day}>
      {<HoursList tasks={tasks} renderItem={renderItem} isToday={checkIsToday({ year, month, date })} />}
    </div>
  );
}
