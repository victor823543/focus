import React from "react";
import { WeekScoreLeft } from "../../../types/Dashboard";
import { to1Dec } from "../../../utils/functions";
import HalfCircleProgress from "../../common/HalfCircleProgress/HalfCircleProgress";
import styles from "./WeekScoreLeftBox.module.css";

type WeekScoreLeftBoxProps = {
  data: WeekScoreLeft;
  isFirstWeek: boolean;
};

const WeekScoreLeftBox: React.FC<WeekScoreLeftBoxProps> = ({
  data,
  isFirstWeek,
}) => {
  const toRecordPercentage = isFirstWeek ? 100 : data.toRecordPercentage;
  const toAveragePercentage = isFirstWeek ? 100 : data.toAveragePercentage;
  return (
    <div className={styles.box}>
      <div className={styles.container}>
        <h3 className={styles.h3}>Record week</h3>
        <div className={styles.progressWrapper}>
          <HalfCircleProgress
            progress={toRecordPercentage}
            size={150}
            strokeWidth={15}
          >
            <span className={styles.percentage}>
              {to1Dec(toRecordPercentage)}%
            </span>
          </HalfCircleProgress>
        </div>
        <div className={styles.progressWrapperSmall}>
          <HalfCircleProgress
            progress={toRecordPercentage}
            size={150}
            strokeWidth={15}
          >
            <span className={styles.percentage}>
              {to1Dec(toRecordPercentage)}%
            </span>
          </HalfCircleProgress>
        </div>
        <div className={styles.info}>
          <p className={styles.topP}>
            <span className={styles.bold}>Score to Record Week:</span>{" "}
            <span className={styles.data}>{to1Dec(data.toRecord)}</span>
          </p>
          <p className={styles.bottomP}>
            <span className={styles.bold}>Average Day Score Needed:</span>{" "}
            <span className={styles.data}>{to1Dec(data.avgScoreToRecord)}</span>
          </p>
        </div>
      </div>
      <div className={styles.container}>
        <h3 className={styles.h3}>Average week</h3>
        <div className={styles.progressWrapper}>
          <HalfCircleProgress
            progress={toAveragePercentage}
            size={150}
            strokeWidth={15}
          >
            <span className={styles.percentage}>
              {to1Dec(toAveragePercentage)}%
            </span>
          </HalfCircleProgress>
        </div>
        <div className={styles.progressWrapperSmall}>
          <HalfCircleProgress
            progress={toAveragePercentage}
            size={150}
            strokeWidth={15}
          >
            <span className={styles.percentage}>
              {to1Dec(toAveragePercentage)}%
            </span>
          </HalfCircleProgress>
        </div>
        <div className={styles.info}>
          <p className={styles.topP}>
            <span className={styles.bold}>Score to Average Week:</span>{" "}
            <span className={styles.data}>{to1Dec(data.toAverage)}</span>
          </p>
          <p className={styles.bottomP}>
            <span className={styles.bold}>Average Day Score Needed:</span>{" "}
            <span className={styles.data}>
              {to1Dec(data.avgScoreToAverage)}
            </span>
          </p>
        </div>
      </div>
      {isFirstWeek && (
        <div className={styles.isFirstWeek}>
          <h3>This is your first week.</h3>
          <p> There is no previous week to compare to.</p>
        </div>
      )}
    </div>
  );
};

export default WeekScoreLeftBox;
