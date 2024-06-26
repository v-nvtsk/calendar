import { FormEvent, useRef } from "react";
import { Filter } from "../../api/calendar.types";
import { dateFromInputValue, dateToInputValue } from "../../helpers";
import styles from "./style.module.css";

type PropsType = {
  onFilter: (filter: Filter) => void;
  filter: Filter;
};

export const TaskFilterForm = ({ onFilter, filter }: PropsType) => {
  const formRef = useRef<HTMLFormElement>(null);

  const callbacks = {
    resetHandler: () => {
      formRef.current?.reset();
      onFilter({});
    },
    submitHandler: (ev: FormEvent) => {
      ev.preventDefault();
      const newFilter: Filter = {};
      const text = (formRef.current?.elements.namedItem("text") as HTMLInputElement).value;
      if (text) newFilter.text = text;
      const tagText = (formRef.current?.elements.namedItem("tagText") as HTMLInputElement).value;
      if (tagText) newFilter.tagText = tagText;
      const dateFrom = (formRef.current?.elements.namedItem("dateFrom") as HTMLInputElement).value;
      if (dateFrom) newFilter.dateFrom = dateFromInputValue(dateFrom);
      const dateTo = (formRef.current?.elements.namedItem("dateTo") as HTMLInputElement).value;
      if (dateTo) newFilter.dateTo = dateFromInputValue(dateTo);
      const status = (formRef.current?.elements.namedItem("status") as HTMLInputElement).value;
      if (status !== "") newFilter.status = Boolean(+status);
      onFilter(newFilter);
    },
  };

  return (
    <form ref={formRef} id="filter-controls" className={styles.filterControls} onSubmit={callbacks.submitHandler}>
      <fieldset className={styles.filter__fieldset}>
        <legend>Filter</legend>
        <div className={styles.dateFromGroup}>
          <label htmlFor="dateFrom">From date:</label>
          <input
            className="filter__date-from"
            id="dateFrom"
            name="dateFrom"
            type="date"
            defaultValue={dateToInputValue(filter.dateFrom)}
          />
        </div>

        <div className={styles.dateToGroup}>
          <label htmlFor="dateTo">To date:</label>
          <input
            className="filter__date-to"
            name="dateTo"
            id="dateTo"
            type="date"
            defaultValue={dateToInputValue(filter.dateTo)}
          />
        </div>

        <div className={styles.textGroup}>
          <label htmlFor="text">By text content:</label>
          <input
            className="filter__text"
            name="text"
            id="text"
            type="text"
            placeholder="Search"
            defaultValue={filter.text || ""}
          />
        </div>

        <div className={styles.statusGroup}>
          <label htmlFor="status">By status:</label>
          <select
            className="filter__status"
            name="status"
            id="status"
            defaultValue={filter.status === undefined ? "" : +filter.status}
          >
            <option value="">All</option>
            <option value="0">Todo</option>
            <option value="1">Done</option>
          </select>
        </div>

        <div className={styles.tagsGroup}>
          <label htmlFor="tagText">By tag:</label>
          <input
            className="filter__tags"
            name="tagText"
            id="tagText"
            type="text"
            placeholder="Tags"
            defaultValue={filter.tagText || ""}
          />
        </div>

        <div className={styles.btnGroup}>
          <button type="submit" className={styles.btn}>
            Filter
          </button>
          <button type="reset" className={styles.btn} onClick={callbacks.resetHandler}>
            Clear
          </button>
        </div>
      </fieldset>
    </form>
  );
};
