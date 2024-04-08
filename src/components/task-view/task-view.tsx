import { TodoItem } from "../../api/calendar.types";
import styles from "./style.module.css";

type PropsType = {
  task: TodoItem;
  onEdit: () => void;
  onCheck: (patch: Partial<TodoItem>) => void;
};

export function TaskView({ task, onEdit, onCheck }: PropsType) {
  const callbacks = {
    onCheck: (ev: React.ChangeEvent) => {
      const status = (ev.target as HTMLInputElement).checked;
      onCheck({ status });
    },
  };

  return (
    <>
      <div className={styles.taskGroup}>
        <input
          className={styles.checkbox}
          type="checkbox"
          name="status"
          id="status"
          checked={task.status}
          onChange={callbacks.onCheck}
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
        <button type="button" onClick={onEdit}>
          Edit
        </button>
      </div>
    </>
  );
}
