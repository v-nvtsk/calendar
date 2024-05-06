import React from "react";
import { Link } from "react-router-dom";
import { type TodoItem } from "../../api/calendar.types";
import styles from "./style.module.css";

function renderTags(tags: string): JSX.Element[] {
  let result: JSX.Element[];
  if (tags.length === 0) {
    result = [];
  } else {
    result = tags.split(",").map((tag) => (
      <li className={styles.tagItem} key={tag}>
        <Link to={`/calendar/list?filter=${JSON.stringify({ tagText: tag.trim() })}`} className={styles.tag}>
          {tag.trim()}
        </Link>
      </li>
    ));
  }

  return result;
}

type Props = {
  itemData: TodoItem;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCheck: (id: string, status: boolean) => void;
};

export function TaskItem(props: Props) {
  const { itemData, onDelete, onEdit, onCheck } = props;
  if (itemData.id === undefined) return null;

  const callbacks = {
    deleteHandler: () => {
      onDelete(itemData.id!);
    },
    editHandler: () => {
      onEdit(itemData.id!);
    },
    checkHandler: (ev: React.ChangeEvent) => {
      const status = (ev.target as HTMLInputElement).checked;
      onCheck(itemData.id!, status);
    },
  };

  return (
    <li className={styles.item} data-id={itemData.id}>
      <div className={styles.checkboxBlock}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={itemData.status}
          onChange={callbacks.checkHandler}
        />
      </div>
      <div className={styles.titleGroup}>
        <Link to={`../task/view?id=${itemData.id}`} className={styles.title}>
          {itemData.taskTitle}
        </Link>
        <p className={styles.description}>{itemData.description}</p>
      </div>
      <div className={styles.datesGroup}>
        <span>Created: {new Date(itemData.creationDate).toLocaleDateString()}</span>
        <span>Start time: {new Date(itemData.startDate).toLocaleDateString()}</span>
      </div>
      <div className={styles.btnGroup}>
        <button
          className={[styles.btn, styles.btnEdit].join(" ")}
          data-id={itemData.id}
          onClick={callbacks.editHandler}
        >
          ✏️
        </button>
        <button
          className={[styles.btn, styles.btnDelete].join(" ")}
          data-id={itemData.id}
          onClick={callbacks.deleteHandler}
        >
          🗑️
        </button>
      </div>
      {itemData.tags && <ul className={styles.tagsGroup}>{renderTags(itemData.tags)}</ul>}
    </li>
  );
}
