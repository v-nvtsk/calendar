import React from "react";

type DropdownProps = {
  items: string[];
  changeHandler: (value: string) => void;
  value?: string;
  selected: string;
  name: string;
  className?: string;
};
export const Dropdown = ({ items, changeHandler, selected, name, className = "" }: DropdownProps) => {
  const onChange = (ev: React.ChangeEvent) => {
    const target = ev.target as HTMLSelectElement;
    changeHandler(target.value);
  };
  return (
    <select className={className} name={name} onChange={onChange} value={selected}>
      {items.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
};
