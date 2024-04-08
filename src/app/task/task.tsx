import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { TodoItem } from "../../api/calendar.types";
import { TaskEditForm } from "../../components/task-edit-form/task-edit-form";
import { TaskView } from "../../components/task-view/task-view";
import { AppDispatch, StoreRootState } from "../../store";
import { read, update } from "../../store/calendarSlice";
import styles from "./style.module.css";

export const Task = () => {
  const navigate = useNavigate();
  const { action } = useParams();
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
    onChange: useCallback(
      (patch: Partial<TodoItem>) => {
        dispatch(update({ id, ...patch }));
        if (action === "edit") navigate(`/task/view?id=${id}`, { replace: true });
      },
      [id],
    ),
    onEdit: useCallback(() => {
      navigate(`/task/edit?id=${id}`, { replace: true });
    }, [id]),
  };

  if (!task) return null;
  return (
    <div className={styles.task}>
      {action === "view" && <TaskView task={task} onCheck={callbacks.onChange} onEdit={callbacks.onEdit} />}
      {action === "edit" && <TaskEditForm task={task} onChange={callbacks.onChange} />}
    </div>
  );
};
