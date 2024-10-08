import React from "react";
import styles from "./LineTabs.module.css";

type LineTabsProps = {
  tabs: string[];
  selected: number;
  setSelected: (index: number) => void;
};

const LineTabs: React.FC<LineTabsProps> = ({ tabs, selected, setSelected }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((label, index) => (
        <div
          key={label}
          onClick={() => setSelected(index)}
          className={`${styles.tab} ${selected === index ? styles.selected : ""}`}
        >
          <span>{label}</span>
          <div className={`${styles.line} ${styles.outline}`}></div>
          {selected === index && (
            <div className={`${styles.line} ${styles.foreground}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LineTabs;
