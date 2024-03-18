import React, { useState } from "react";
import { Button } from "..";
import styles from "./style.module.css";

export type SearchFormProps = {
  onSubmit: (text: string) => void;
  className?: string;
};

export function SearchForm({ onSubmit, className = "" }: SearchFormProps) {
  const [inputState, setInputState] = useState("");

  const callbacks = {
    handleSearch: (ev: React.FormEvent) => {
      ev.preventDefault();
      onSubmit(inputState);
    },
  };
  return (
    <form className={`${styles.searchForm} ${className}`} action="submit" onSubmit={callbacks.handleSearch}>
      <input
        type="text"
        name="search"
        className={styles.input}
        placeholder="search"
        value={inputState}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
      />
      <Button type="submit" className={styles.btn} imageType="search" />
    </form>
  );
}
