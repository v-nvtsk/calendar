import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { TodoItem } from "../../api/calendar.types";
import { TaskEditForm } from "../../components/task-edit-form/task-edit-form";
import { AppDispatch, StoreRootState } from "../../store";
import { read, update } from "../../store/calendarSlice";
import styles from "./style.module.css";

export const TaskView = () => {
  const [searchParams] = useSearchParams();
  const searchAsObject = Object.fromEntries(new URLSearchParams(searchParams));

  const { id } = searchAsObject;
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(read({}));
  }, []);

  const tasks = useSelector((state: StoreRootState) => state.calendar.items);
  const task = tasks.filter((el) => el.id === id)[0];

  const callbacks = {
    onChange: (ev: React.ChangeEvent) => {
      const status = (ev.target as HTMLInputElement).checked;
      dispatch(update({ id, status }));
    },
    onEdit: (data: Partial<TodoItem>) => {
      dispatch(update({ ...data, id: task.id! }));
    },
  };

  if (!task) return null;
  return (
    <div className={styles.task}>
      <div className={styles.taskGroup}>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="status"
          id="status"
          checked={task.status}
          onChange={callbacks.onChange}
        />
        <h1 className={styles.taskTitle}>{task.taskTitle}</h1>
      </div>
      <p className={styles.taskField}>
        <span className={styles.fieldName}>description:</span> {task?.description}
      </p>
      <p className={styles.taskField}>
        <span className={styles.fieldName}>Start:</span> {new Date(task.startDate).toLocaleString()}
      </p>
      <p className={styles.taskField}>
        <span className={styles.fieldName}>End:</span> {new Date(task.endDate ?? task.startDate).toLocaleString()}
      </p>
      <div className={styles.taskField}>
        <span className={styles.fieldName}>Tags:</span>
        {!task.tags?.length ? (
          <p className={styles.taskNoTags}>no tags</p>
        ) : (
          <ul className={styles.tagsList}>
            {task.tags?.split(",").map((el: string) => (
              <li className={styles.tag} key={el}>
                <a href={`filter=%7B"tagText"%3A"${el}"%7D`}>{el}</a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <hr />
      <TaskEditForm task={task} onEdit={callbacks.onEdit} />
    </div>
  );
};
