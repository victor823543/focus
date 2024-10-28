import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { useMemo } from "react";
import { useCalendar } from "../../../hooks/useCalendar";
import { DayStatus, ListDaysReturn } from "../../../types/Day";
import { formatDate, to1Dec, toYMD } from "../../../utils/functions";
import DayStatusMarker from "../DayStatusMarker/DayStatusMarker";
import InfoPopupContent from "../InfoPopupContent/InfoPopupContent";
import styles from "./CalendarMonthView.module.css";

type CalendarMonthViewProps = {
  days: ListDaysReturn;
};

export type SelectedInfo = {
  formattedDate: string;
  status: DayStatus;
  score?: {
    maxScore: number;
    totalScore: number;
    percentageScore: number;
  };
};

const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({ days }) => {
  const {
    currentMonth,
    currentMonthDates,
    currentDate,
    goToPrevMonth,
    goToNextMonth,
    goToDate,
    getDateStatus,
  } = useCalendar();

  const selectedInfo: SelectedInfo = useMemo(() => {
    const status: DayStatus = getDateStatus(
      currentDate,
      toYMD(currentDate) in days,
    );

    const formattedDate = formatDate(currentDate, "custom", {
      day: "numeric",
      month: "long",
      weekday: "long",
    });

    let score;

    if (status === DayStatus.HasResult) {
      const thisDay = days[toYMD(currentDate)];
      const totalScore = to1Dec(thisDay.totalScore);
      const maxScore = thisDay.maxScore;
      const percentageScore = to1Dec(thisDay.percentageScore);

      score = { totalScore, maxScore, percentageScore };
    } else score = undefined;

    return {
      status,
      formattedDate,
      score,
    };
  }, [currentDate, days]);

  return (
    <>
      {/* Desktop */}
      <div className={styles.calendarMonth}>
        <header className={styles.header}>
          <div onClick={goToPrevMonth} className={styles.arrowContainer}>
            <ChevronLeftIcon />
          </div>
          <div className={styles.monthText}>{currentMonth}</div>
          <div onClick={goToNextMonth} className={styles.arrowContainer}>
            <ChevronRightIcon />
          </div>
        </header>
        <div className={styles.weekDays}>
          {weekdays.map((weekday) => (
            <div key={weekday}>{weekday}</div>
          ))}
        </div>
        <main className={styles.calendar}>
          {currentMonthDates.map((week) =>
            week.map((day) => {
              const status: DayStatus = getDateStatus(day, toYMD(day) in days);
              const statusStyles = styles[`status-${status}`];
              const selectedDayStyles =
                currentDate.toDateString() === day.toDateString()
                  ? styles.selected
                  : "";
              const todayStyles =
                new Date().toDateString() === day.toDateString()
                  ? styles.today
                  : "";

              const notInMonthStyles =
                currentDate.getMonth() === day.getMonth()
                  ? ""
                  : styles.notInMonth;

              const classes = `${todayStyles} ${selectedDayStyles} ${notInMonthStyles} ${statusStyles}`;

              let score;

              if (status === DayStatus.HasResult) {
                const thisDay = days[toYMD(day)];
                const totalScore = to1Dec(thisDay.totalScore);
                const maxScore = thisDay.maxScore;
                const percentageScore = to1Dec(thisDay.percentageScore);

                score = { totalScore, maxScore, percentageScore };
              }

              return (
                <div
                  className={`${styles.day} ${classes}`}
                  key={day.toString()}
                  onClick={() => goToDate(day)}
                >
                  <div className={styles.dayNumber}>{day.getDate()}</div>
                  <DayStatusMarker status={status} score={score} />
                </div>
              );
            }),
          )}
        </main>
      </div>

      {/* Phone */}
      <div className={styles.smallScreenWrapper}>
        {/* Calendar */}
        <div className={styles.calendarMonthSmall}>
          <header className={styles.header}>
            <div onClick={goToPrevMonth} className={styles.arrowContainer}>
              <ChevronLeftIcon strokeWidth={3} />
            </div>
            <div className={styles.monthText}>{currentMonth}</div>
            <div onClick={goToNextMonth} className={styles.arrowContainer}>
              <ChevronRightIcon strokeWidth={3} />
            </div>
          </header>
          <div className={styles.weekDays}>
            {weekdays.map((weekday) => (
              <div key={weekday}>{weekday}</div>
            ))}
          </div>
          <main className={styles.calendar}>
            {currentMonthDates.map((week) =>
              week.map((day) => {
                const status: DayStatus = getDateStatus(
                  day,
                  toYMD(day) in days,
                );
                const statusStyles = styles[`status-${status}`];
                const selectedDayStyles =
                  currentDate.toDateString() === day.toDateString()
                    ? styles.selected
                    : "";
                const todayStyles =
                  new Date().toDateString() === day.toDateString()
                    ? styles.today
                    : "";

                const notInMonthStyles =
                  currentDate.getMonth() === day.getMonth()
                    ? ""
                    : styles.notInMonth;

                const classes = `${todayStyles} ${selectedDayStyles} ${notInMonthStyles} ${statusStyles}`;

                return (
                  <div
                    className={`${styles.day} ${classes}`}
                    key={day.toString()}
                    onClick={() => goToDate(day)}
                  >
                    <div className={styles.dayNumber}>{day.getDate()}</div>
                    <div className={styles.statusBar}></div>
                  </div>
                );
              }),
            )}
          </main>
        </div>
        {/* Info Popup */}
        <div className={styles.dayInfo}>
          <InfoPopupContent info={selectedInfo} />
        </div>
      </div>
    </>
  );
};

export default CalendarMonthView;

const weekdays = ["Mon", "Tue", "Wed", "Th", "Fri", "Sat", "Sun"];
