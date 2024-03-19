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
  onGoToRelative: (action: string, value: string) => void;
  onToday: () => void;
  onSearch: (value: string) => void;
};

export function CalendarControls({
  controlsTitle,
  views,
  activeView = "year",
  setActiveView,
  onGoToRelative,
  onToday,
  onSearch,
}: PropType) {
  const callbacks = {
    prevHandler: () => {
      onGoToRelative("prev", activeView);
    },
    nextHandler: () => {
      onGoToRelative("next", activeView);
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
      <Dropdown
        name="select-view"
        className="calendar__select-view"
        items={views}
        changeHandler={setActiveView}
        selected={activeView}
      />
      <div className={styles.separator}></div>
      <SearchForm onSubmit={callbacks.handleSearch} />
    </div>
  );
}
