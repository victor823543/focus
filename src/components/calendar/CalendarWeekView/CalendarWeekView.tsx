import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useCalendar } from "../../../hooks/useCalendar";
import styles from "./CalendarWeekView.module.css";

const CalendarWeekView = () => {
  const {
    goToNextWeek,
    goToPrevWeek,
    currentWeekDates,
    currentWeek,
    currentMonth,
    currentDate,
  } = useCalendar();
  return (
    <div className={styles.calendarWeek}>
      <header className={styles.header}>
        <div onClick={goToPrevWeek} className={styles.arrowContainer}>
          <ChevronLeftIcon />
        </div>
        <div className={styles.weekText}>
          Week {currentWeek} {currentDate.getFullYear()}
        </div>
        <div onClick={goToNextWeek} className={styles.arrowContainer}>
          <ChevronRightIcon />
        </div>
      </header>
      <div className={styles.wrapper}>
        <div className={styles.weekDays}>
          {weekdays.map((weekday) => (
            <div key={weekday}>
              <div>{weekday}</div>
              <div>
                {currentDate.getDate()} / {currentDate.getMonth() + 1}
              </div>
            </div>
          ))}
        </div>
        <main className={styles.calendar}>
          {currentWeekDates.map((day) => {
            return <div key={day.toISOString()} className={styles.day}></div>;
          })}
        </main>
      </div>
    </div>
  );
};

export default CalendarWeekView;

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
