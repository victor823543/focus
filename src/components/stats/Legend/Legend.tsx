import React from "react";
import styles from "./Legend.module.css";

type LegendItemType = {
  color: string;
  title: string;
};

type LegendItemProps = LegendItemType & {
  onClick?: (title: string) => void;
  hidden?: boolean;
};

type LegendProps = {
  legends: LegendItemType[];
  onClick?: (title: string) => void;
  className?: string;
  hidden?: string[];
};

const Legend: React.FC<LegendProps> = ({
  legends,
  onClick,
  className,
  hidden,
}) => {
  return (
    <div className={`${styles.legend} ${className}`}>
      {legends.map((legend) => (
        <LegendItem
          key={legend.title}
          color={legend.color}
          title={legend.title}
          onClick={onClick}
          hidden={hidden?.includes(legend.title)}
        />
      ))}
    </div>
  );
};

const LegendItem: React.FC<LegendItemProps> = ({
  color,
  title,
  onClick,
  hidden,
}) => {
  return (
    <div
      className={`${styles.itemWrapper} ${hidden ? styles.hidden : ""}`}
      onClick={onClick ? () => onClick(title) : undefined}
    >
      <div style={{ backgroundColor: color }} className={styles.icon}></div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default Legend;
