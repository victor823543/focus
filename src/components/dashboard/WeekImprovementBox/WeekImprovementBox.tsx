import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { to1Dec } from "../../../utils/functions";
import styles from "./WeekImprovementBox.module.css";

type WeekImprovementBoxProps = {
  comparison: number;
};

const WeekImprovementBox: React.FC<WeekImprovementBoxProps> = ({
  comparison,
}) => {
  return (
    <div
      className={`${styles.weekImprovement} ${comparison > 0 ? styles.positive : styles.negative}`}
    >
      <div className={styles.container}>
        <h2 className={styles.h2}>{to1Dec(comparison)}%</h2>
        <span className={`${styles.arrowContainer}`}>
          {comparison > 0 ? (
            <ArrowLongUpIcon strokeWidth={2} />
          ) : (
            <ArrowLongDownIcon strokeWidth={2} />
          )}
        </span>
      </div>
      <p className={styles.p}>
        {comparison > 0 ? "Improvement" : "Decline"} since last week. <br />
        {comparison > 0 ? "Keep it up!" : "You can do better!"}
      </p>
    </div>
  );
};

export default WeekImprovementBox;
