import React, { HTMLProps } from "react";
import styles from "./StatsGrid.module.css";

const StatsGrid: React.FC<HTMLProps<HTMLElement>> = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default StatsGrid;
