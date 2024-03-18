import React from "react";

type DropdownProps = {
  items: string[];
  changeHandler: (value: string) => void;
  value?: string;
  selected: string;
};
export const Dropdown = ({ items, changeHandler, selected }: DropdownProps) => {
  const onChange = (ev: React.ChangeEvent) => {
    const target = ev.target as HTMLSelectElement;
    changeHandler(target.value);
  };
  return (
    <select onChange={onChange} value={selected}>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
