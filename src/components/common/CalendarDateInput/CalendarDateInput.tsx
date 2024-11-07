import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useCalendar } from "../../../hooks/useCalendar";
import { weekdaysShort } from "../../../utils/constants";
import { toYMD } from "../../../utils/functions";
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

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className={styles.calendarMonthSmall}>
          <header className={styles.header}>
            <div onClick={goToPrevMonth} className={styles.arrowContainer}>
              <ChevronLeftIcon strokeWidth={2} width={"1.7rem"} />
            </div>
            <div className={styles.monthText}>{currentMonth}</div>
            <div onClick={goToNextMonth} className={styles.arrowContainer}>
              <ChevronRightIcon strokeWidth={2} width={"1.7rem"} />
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
                    onClick={() => onChange(toYMD(day))}
                    data-cy={`calendar-day-${day.getDate()}`}
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

type CalendarDateInputNoFormProps = {
  callback: (date: Date) => void;
  selectedDate?: string | null;
  variant?: "configuration" | "stats";
};

export const CalendarDateInputNoForm: React.FC<
  CalendarDateInputNoFormProps
> = ({ callback, selectedDate, variant = "stats" }) => {
  const {
    currentMonth,
    currentDate,
    currentMonthDates,
    goToPrevMonth,
    goToNextMonth,
  } = useCalendar();

  return (
    <div className={`${styles.calendarMonthSmall} ${styles[variant]}`}>
      <header className={styles.header}>
        <div onClick={goToPrevMonth} className={styles.arrowContainer}>
          <ChevronLeftIcon strokeWidth={2} width={"1.7rem"} />
        </div>
        <div className={styles.monthText}>{currentMonth}</div>
        <div onClick={goToNextMonth} className={styles.arrowContainer}>
          <ChevronRightIcon strokeWidth={2} width={"1.7rem"} />
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
              selectedDate && selectedDate === toYMD(day)
                ? styles.selected
                : "";
            const todayStyles =
              toYMD(new Date()) === toYMD(day) ? styles.today : "";
            const notInMonthStyles =
              monthNumber === day.getMonth() ? "" : styles.notInMonth;

            const classes = `${todayStyles} ${selectedDayStyles} ${notInMonthStyles}`;

            return (
              <div
                className={`${styles.day} ${classes}`}
                key={day.toString()}
                onClick={() => callback(day)}
              >
                <div className={styles.dayNumber}>{day.getDate()}</div>
                <div className={styles.statusBar}></div>
              </div>
            );
          }),
        )}
      </main>
    </div>
  );
};

export default CalendarDateInput;
