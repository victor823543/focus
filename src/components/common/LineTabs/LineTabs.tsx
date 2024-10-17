import React from "react";
import styles from "./LineTabs.module.css";

type LineTabsProps = {
  tabs: string[];
  selected: string;
  setSelected: (tab: string) => void;
};

const LineTabs: React.FC<LineTabsProps> = ({ tabs, selected, setSelected }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((label) => (
        <div
          key={label}
          onClick={() => setSelected(label)}
          className={`${styles.tab} ${selected === label ? styles.selected : ""}`}
        >
          <span>{label}</span>
          <div className={`${styles.line} ${styles.outline}`}></div>
          {selected === label && (
            <div className={`${styles.line} ${styles.foreground}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LineTabs;
