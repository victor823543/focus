import React from "react";
import { DayStatus } from "../../../types/Day";
import styles from "./DayStatusMarker.module.css";

type DayStatusMarkerProps = {
  status: DayStatus;
  score?: {
    maxScore: number;
    totalScore: number;
    percentageScore: number;
  };
};

const DayStatusMarker: React.FC<DayStatusMarkerProps> = ({ status, score }) => {
  switch (status) {
    case DayStatus.MissingResult:
      return (
        <div className={`${styles.marker} ${styles[`status-${status}`]}`}>
          <p className={styles.markerP}>Missing result</p>
        </div>
      );
    case DayStatus.WaitingResult:
      return (
        <div className={`${styles.marker} ${styles[`status-${status}`]}`}>
          <p className={styles.markerP}>Waiting result</p>
        </div>
      );
    case DayStatus.HasResult:
      return (
        <div className={`${styles.marker} ${styles[`status-${status}`]}`}>
          <p className={styles.markerP}>
            {score?.totalScore} / {score?.maxScore}
          </p>
        </div>
      );
    case DayStatus.Before:
    case DayStatus.After:
  }
};

export default DayStatusMarker;
