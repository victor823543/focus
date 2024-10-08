import React from "react";
import styles from "./CategoriesGrid.module.css";

type CategoriesGridProps = {
  children: React.ReactNode;
};

const CategoriesGrid: React.FC<CategoriesGridProps> = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default CategoriesGrid;
