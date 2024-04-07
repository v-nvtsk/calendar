import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TodoItem } from "../../api/calendar.types";
import { AppDispatch } from "../../store";
import { deleteTask, update } from "../../store/calendarSlice";
import { TaskItem } from "../task-item/task-item";
import "./style.css";

type ListProps = {
  tasks: TodoItem[];
  onEdit: (id: string) => any;
};

export function TaskList({ onEdit, tasks }: ListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const items = tasks;

  const callbacks = {
    onDelete: useCallback((id: string) => {
      dispatch(deleteTask(id));
    }, []),
    onEdit: (id: string) => {
      onEdit(id);
    },
    onCheck: useCallback((id: string, status: boolean) => {
      dispatch(update({ id, status }));
    }, []),
  };

  return (
    <div className="task-list">
      {items.map((item: TodoItem) => (
        <TaskItem
          itemData={item}
          key={item.id}
          onDelete={callbacks.onDelete}
          onEdit={callbacks.onEdit}
          onCheck={callbacks.onCheck}
        />
      ))}
    </div>
  );
}
