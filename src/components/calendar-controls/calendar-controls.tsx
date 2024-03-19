import { useCallback } from "react";
import { Dropdown, SearchForm } from "../../UI";
import { Button } from "../../UI/button";
import { Views } from "../../helpers";
import styles from "./style.module.css";

type PropType = {
  controlsTitle: string;
  views: Views[];
  activeView?: string;
  setActiveView: (value: string) => void;
  onPrev: (view: string) => void;
  onNext: (view: string) => void;
  onToday: () => void;
  onSearch: (value: string) => void;
};

export function CalendarControls({
  controlsTitle,
  views,
  activeView = "year",
  setActiveView,
  onPrev,
  onNext,
  onToday,
  onSearch,
}: PropType) {
  const callbacks = {
    prevHandler: () => {
      onPrev(activeView);
    },
    nextHandler: () => {
      onNext(activeView);
    },
    handleSearch: useCallback(
      (searchValue: string) => {
        onSearch(searchValue);
      },
      [activeView],
    ),
  };
  return (
    <div className={styles.controls}>
      <Button className={`${styles.btn} ${styles.btnToday}`} title="Today" onClick={onToday} />
      <div className={styles.btnGroup}>
        <Button className={`${styles.btn} ${styles.btnPrev}`} imageType="prevArrow" onClick={callbacks.prevHandler} />
        <Button className={`${styles.btn} ${styles.btnNext}`} imageType="nextArrow" onClick={callbacks.nextHandler} />
      </div>
      <div className={styles.textContent}>{controlsTitle}</div>
      <Dropdown items={views} changeHandler={setActiveView} selected={activeView} />
      <div className={styles.separator}></div>
      <SearchForm onSubmit={callbacks.handleSearch} />
    </div>
  );
}
