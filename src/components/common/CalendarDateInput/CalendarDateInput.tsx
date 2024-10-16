import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useCalendar } from "../../../hooks/useCalendar";
import { weekdaysShort } from "../../../utils/constants";
import styles from "./CalendarDateInput.module.css";

type CalendarDateInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
};

const CalendarDateInput = <TFieldValues extends FieldValues>({
  name,
  form,
}: CalendarDateInputProps<TFieldValues>) => {
  const {
    currentMonth,
    currentDate,
    currentMonthDates,
    goToPrevMonth,
    goToNextMonth,
  } = useCalendar();

  console.log(currentMonthDates);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={styles.calendarMonthSmall}>
          <header className={styles.header}>
            <div onClick={goToPrevMonth} className={styles.arrowContainer}>
              <ChevronLeftIcon strokeWidth={2} />
            </div>
            <div className={styles.monthText}>{currentMonth}</div>
            <div onClick={goToNextMonth} className={styles.arrowContainer}>
              <ChevronRightIcon strokeWidth={2} />
            </div>
          </header>
          <div className={styles.weekDays}>
            {weekdaysShort.map((weekday) => (
              <div key={weekday}>{weekday}</div>
            ))}
          </div>
          <main className={styles.calendar}>
            {currentMonthDates.map((week) =>
              week.map((day) => {
                const monthNumber = currentDate.getMonth();
                const selectedDayStyles =
                  value && new Date(value).toDateString() === day.toDateString()
                    ? styles.selected
                    : "";
                const todayStyles =
                  new Date().toDateString() === day.toDateString()
                    ? styles.today
                    : "";
                const notInMonthStyles =
                  monthNumber === day.getMonth() ? "" : styles.notInMonth;

                const classes = `${todayStyles} ${selectedDayStyles} ${notInMonthStyles}`;

                return (
                  <div
                    className={`${styles.day} ${classes}`}
                    key={day.toString()}
                    onClick={() => onChange(new Date(day).toISOString())}
                  >
                    <div className={styles.dayNumber}>{day.getDate()}</div>
                    <div className={styles.statusBar}></div>
                  </div>
                );
              }),
            )}
          </main>
          {error && (
            <div className={styles.error}>
              <ExclamationTriangleIcon
                className={styles.errorIcon}
                aria-hidden="true"
              />
              <span className={styles.errorText}>
                {error.message?.toString()}
              </span>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default CalendarDateInput;
