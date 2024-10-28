import React from "react";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import { SessionStatsInfo } from "../../../types/Stats";
import { formatDate, to1Dec, toYMD } from "../../../utils/functions";
import { CalendarDateInputNoForm } from "../../common/CalendarDateInput/CalendarDateInput";
import styles from "./DayStatsHeader.module.css";

type DayStatsHeaderProps = {
  sessionInfo: SessionStatsInfo;
};

const DayStatsHeader: React.FC<DayStatsHeaderProps> = ({ sessionInfo }) => {
  const { currentValue, setParam } = useHandleSearchParam("date");
  return (
    <header className={styles.header}>
      <h1 className={styles.h1}>Day Statistics</h1>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>
              <span>Total days logged:</span>
              <span>{sessionInfo.totalDays}</span>
            </div>
            <div className={styles.bar}></div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>
              <span>Overall score:</span>
              <span>{to1Dec(sessionInfo.totalScore)}</span>
            </div>
            <div className={styles.bar}></div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>
              <span>Best day yet:</span>
              <span>
                {formatDate(new Date(sessionInfo.bestDay.date), "short")}
              </span>
            </div>
            <div className={styles.bar}></div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>
              <span>Worst day yet:</span>
              <span>
                {formatDate(new Date(sessionInfo.worstDay.date), "short")}
              </span>
            </div>
            <div className={styles.bar}></div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <CalendarDateInputNoForm
            callback={(date) => setParam(toYMD(date))}
            selectedDate={currentValue}
          />
        </div>
      </div>
    </header>
  );
};

export default DayStatsHeader;
