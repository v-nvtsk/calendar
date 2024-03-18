import React from "react";
import styles from "./style.module.css";

export type AccordionProps = {
  className?: string;
  items: AccordionItem[];
};

export type AccordionItem = {
  title: string;
  content: JSX.Element;
  initiallyOpened?: boolean;
};

export const Accordion = ({ className = "", items }: AccordionProps) => {
  if (items.length === 0) {
    return null;
  }

  const callbacks = {
    onClick: (ev: React.MouseEvent) => {
      const target = ev.target as HTMLParagraphElement;
      const panel = target.nextElementSibling as HTMLElement;
      panel.style.maxHeight = target.classList.contains(styles.active) ? "0" : `${panel.scrollHeight}px`;
      target.classList.toggle(styles.active);
    },
  };

  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.title} className={`${className}__item`}>
          <button
            className={`${styles.accordion} ${item.initiallyOpened ? styles.active : ""}`}
            onClick={callbacks.onClick}
          >
            {item.title}
          </button>
          <div className={styles.panel}>{item.content}</div>
        </div>
      ))}
    </div>
  );
};
