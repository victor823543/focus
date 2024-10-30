import React from "react";
import styles from "./LineTabs.module.css";

type LineTabsProps = {
  tabs: { label: string; id: string }[];
  selected: string;
  setSelected: (tab: string) => void;
  color?: string;
};

const LineTabs: React.FC<LineTabsProps> = ({
  tabs,
  selected,
  setSelected,
  color,
}) => {
  return (
    <div className={styles.tabs} data-testid="line-tabs">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setSelected(tab.id)}
          className={`${styles.tab} ${selected === tab.id ? styles.selected : ""}`}
          data-testid={`tab-${tab.id}`}
        >
          <span>{tab.label}</span>
          <div className={`${styles.line} ${styles.outline}`}></div>
          {selected === tab.id && (
            <div
              style={color ? { backgroundColor: color } : {}}
              className={`${styles.line} ${styles.foreground}`}
              data-testid={`line-${tab.id}`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LineTabs;
