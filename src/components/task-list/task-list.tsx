import { TodoItem } from "../../api/calendar.types";
import { TaskItem } from "../task-item/task-item";
import "./style.css";
import useCallbacks from "./use-callbacks";

type ListProps = {
  tasks: TodoItem[];
  onEdit: (id: string) => any;
};

export function TaskList({ onEdit, tasks }: ListProps) {
  const callbacks = useCallbacks({ onEdit });
  const items = tasks;

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
