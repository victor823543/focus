import React from "react";
import { WeekScoreLeft } from "../../../types/Dashboard";
import { to1Dec } from "../../../utils/functions";
import HalfCircleProgress from "../../common/HalfCircleProgress/HalfCircleProgress";
import styles from "./WeekScoreLeftBox.module.css";

type WeekScoreLeftBoxProps = {
  data: WeekScoreLeft;
};

const WeekScoreLeftBox: React.FC<WeekScoreLeftBoxProps> = ({ data }) => {
  return (
    <div>
      <h2 className={styles.h2}>Weekly target</h2>
      <div className={styles.container}>
        <div className={styles.progressWrapper}>
          <HalfCircleProgress
            progress={data.toRecordPercentage}
            size={150}
            strokeWidth={15}
          >
            <span className={styles.percentage}>
              {to1Dec(data.toRecordPercentage)}%
            </span>
          </HalfCircleProgress>
        </div>
        <div className={styles.info}>
          <p>
            <span className={styles.bold}>Score to Record Week:</span>{" "}
            {to1Dec(data.toRecord)}
          </p>
          <p>
            <span className={styles.bold}>Average Day Score Needed:</span>{" "}
            {to1Dec(data.avgScoreToRecord)}
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.progressWrapper}>
          <HalfCircleProgress
            progress={data.toAveragePercentage}
            size={150}
            strokeWidth={15}
          >
            <span className={styles.percentage}>
              {to1Dec(data.toAveragePercentage)}%
            </span>
          </HalfCircleProgress>
        </div>
        <div className={styles.info}>
          <p>
            <span className={styles.bold}>Score to Average Week:</span>{" "}
            {to1Dec(data.toAverage)}
          </p>
          <p>
            <span className={styles.bold}>Average Day Score Needed:</span>{" "}
            {to1Dec(data.avgScoreToAverage)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeekScoreLeftBox;
