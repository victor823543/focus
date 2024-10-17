import React, { useEffect } from "react";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import LineTabs from "../../common/LineTabs/LineTabs";
import styles from "./CalendarMain.module.css";

const tabs = ["Day", "Week", "Month"];

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
    "Month",
  );

  useEffect(() => addParam, []);

  return (
    <main className={styles.main}>
      <LineTabs
        tabs={tabs}
        selected={currentValue || "Month"}
        setSelected={(tab: string) => setParam(tab)}
      />
      <div className={styles.viewWrapper}>
        {currentValue === "Day" && dayView}
        {currentValue === "Week" && weekView}
        {currentValue === "Month" && monthView}
      </div>
    </main>
  );
};

export default CalendarMain;
