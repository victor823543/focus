import {
  ArrowLongDownIcon,
  ArrowLongUpIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { to1Dec } from "../../../utils/functions";
import styles from "./WeekImprovementBox.module.css";

type WeekImprovementBoxProps = {
  comparison: number;
  isFirstWeek: boolean;
};

const WeekImprovementBox: React.FC<WeekImprovementBoxProps> = ({
  comparison,
  isFirstWeek,
}) => {
  return (
    <div
      className={`${styles.weekImprovement} ${comparison > 0 || isFirstWeek ? styles.positive : styles.negative}`}
    >
      <div className={styles.container}>
        <h2 className={styles.h2}>{isFirstWeek ? 100 : to1Dec(comparison)}%</h2>
        <span className={`${styles.arrowContainer}`}>
          {comparison > 0 || isFirstWeek ? (
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
      {isFirstWeek && (
        <div className={styles.isFirstWeek}>
          <h3>This is your first week.</h3>
          <p> There is no previous week to compare to.</p>
        </div>
      )}
    </div>
  );
};

export default WeekImprovementBox;
