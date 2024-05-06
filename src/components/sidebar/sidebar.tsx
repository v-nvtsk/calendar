import { Accordion } from "../../UI/accordion";
import { AccordionItem } from "../../UI/accordion/accordion";
import { Filter } from "../../api/calendar.types";
import { TaskFilterForm } from "../filter-controls/filter-controls";
import { TaskAddForm } from "../task-add-form";
import styles from "./style.module.css";

type SidebarProps = {
  onFilter: (filter: Filter) => void;
  subfilter: Filter;
  className: string;
};
export const Sidebar = ({ onFilter, subfilter, className }: SidebarProps) => {
  const items: AccordionItem[] = [
    {
      title: "Add task",
      initiallyOpened: true,
      content: <TaskAddForm />,
    },
    {
      title: "Filter",
      initiallyOpened: true,
      content: <TaskFilterForm onFilter={onFilter} filter={subfilter} />,
    },
  ];

  return (
    <aside className={`${styles.sidebar} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>Calendar</h2>
      </div>
      <div className={styles.content}>
        <Accordion className="accordion" items={items} />
      </div>
    </aside>
  );
};
