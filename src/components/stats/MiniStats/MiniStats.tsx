import {
  ArchiveBoxArrowDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import styles from "./MiniStats.module.css";

type MiniStatsProps = {
  percentage: number;
};

const MiniStats: React.FC<MiniStatsProps> = ({ percentage }) => {
  const positive: boolean = percentage >= 0;

  return (
    <div
      className={`${styles.miniStats} ${positive ? styles.positive : styles.negative}`}
    >
      <div className={styles.arrowContainer}>
        {positive ? <ArrowTrendingUpIcon /> : <ArchiveBoxArrowDownIcon />}
      </div>

      <h2 className={styles.percentage}>{percentage} %</h2>
    </div>
  );
};

export default MiniStats;
