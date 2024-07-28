import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
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
      <TextField
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        name="search"
        placeholder="search"
        value={inputState}
        onChange={(e) => {
          setInputState(e.target.value);
        }}
      />
    </form>
  );
}
