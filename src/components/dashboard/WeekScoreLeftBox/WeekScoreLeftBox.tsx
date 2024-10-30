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
    <div className={styles.box}>
      <div className={styles.container}>
        <h3 className={styles.h3}>Record week</h3>
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
        <div className={styles.progressWrapperSmall}>
          <HalfCircleProgress
            progress={data.toRecordPercentage}
            size={100}
            strokeWidth={10}
          >
            <span className={styles.percentage}>
              {to1Dec(data.toRecordPercentage)}%
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
            progress={data.toAveragePercentage}
            size={150}
            strokeWidth={15}
          >
            <span className={styles.percentage}>
              {to1Dec(data.toAveragePercentage)}%
            </span>
          </HalfCircleProgress>
        </div>
        <div className={styles.progressWrapperSmall}>
          <HalfCircleProgress
            progress={data.toAveragePercentage}
            size={100}
            strokeWidth={10}
          >
            <span className={styles.percentage}>
              {to1Dec(data.toAveragePercentage)}%
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
    </div>
  );
};

export default WeekScoreLeftBox;
