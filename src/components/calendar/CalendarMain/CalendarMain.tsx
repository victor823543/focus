import React, { useEffect } from "react";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import LineTabs from "../../common/LineTabs/LineTabs";
import styles from "./CalendarMain.module.css";

const tabs = [
  { label: "Day", id: "day" },
  { label: "Week", id: "week" },
  { label: "Month", id: "month" },
];

type CalendarMainProps = {
  dayView: React.ReactNode;
  weekView: React.ReactNode;
  monthView: React.ReactNode;
};

const CalendarMain: React.FC<CalendarMainProps> = ({
  dayView,
  weekView,
  monthView,
}) => {
  const { addParam, currentValue, setParam } = useHandleSearchParam(
    "tab",
    "month",
  );

  useEffect(() => addParam(), []);

  return (
    <main className={styles.main}>
      <LineTabs
        tabs={tabs}
        selected={currentValue || "month"}
        setSelected={(tab: string) => setParam(tab)}
      />
      <div className={styles.viewWrapper}>
        {currentValue === "day" && dayView}
        {currentValue === "week" && weekView}
        {currentValue === "month" && monthView}
      </div>
    </main>
  );
};

export default CalendarMain;
