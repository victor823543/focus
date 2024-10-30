import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import useSelectSession from "../../../hooks/useSelectSession";
import { useTemporalCalendar } from "../../../hooks/useTemporalCalendar";
import { ListDaysReturn } from "../../../types/Day";
import { callAPI } from "../../../utils/apiService";
import { queryConfig } from "../../../utils/constants";
import { formatDate } from "../../../utils/functions";
import Loading from "../../common/Loading/Loading";
import CalendarItems from "../CalendarItems/CalendarItems";
import styles from "./DashboardCalendar.module.css";

const DashboardCalendar = () => {
  const { currentSession } = useSelectSession();
  const {
    selected,
    selectedDate,
    today,
    selectedWeek,
    goToPrevWeek,
    goToNextWeek,
    selectDay,
    getDateStatus,
  } = useTemporalCalendar();

  const { data, isLoading, error } = useQuery<ListDaysReturn>({
    enabled: !!currentSession,
    ...queryConfig,
    queryKey: ["days", currentSession?.id],
    queryFn: () => callAPI(`/days/all/${currentSession?.id}`, "GET"),
  });

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <h2 className={styles.h2}>
          {formatDate(selectedDate, "custom", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className={styles.arrows}>
          <div className={styles.arrow} onClick={goToPrevWeek}>
            <ChevronLeftIcon strokeWidth={2} />
          </div>
          <div className={styles.arrow} onClick={goToNextWeek}>
            <ChevronRightIcon strokeWidth={2} />
          </div>
        </div>
      </div>
      <div className={styles.daySelect}>
        {selectedWeek.map((day) => {
          const dayNumber = new Date(day).getDate();
          const weekDayFirstLetter = weekdays[(new Date(day).getDay() + 6) % 7];

          return (
            <div
              key={day}
              className={`${styles.day} ${day === selected ? styles.selected : ""} ${day === today ? styles.today : ""} ${weekDayFirstLetter === "S" ? styles.weekend : ""}`}
              onClick={() => selectDay(day)}
            >
              <div className={styles.weekDay}>{weekDayFirstLetter}</div>
              <div className={styles.dayNumber}>
                {dayNumber}
                {day === today && <div className={styles.todayBar}></div>}
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.dayItems}>
        <CalendarItems
          date={selectedDate}
          status={getDateStatus(selected, selected in data)}
          day={data[selected]}
        />
      </div>
    </div>
  );
};

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

export default DashboardCalendar;
