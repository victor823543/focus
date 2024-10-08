import React, { useState } from "react";
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
  const [selectedTab, setSelectedTab] = useState(2);
  return (
    <main className={styles.main}>
      <LineTabs
        tabs={tabs}
        selected={selectedTab}
        setSelected={(index: number) => setSelectedTab(index)}
      />
      <div className={styles.viewWrapper}>
        {selectedTab === 0 && dayView}
        {selectedTab === 1 && weekView}
        {selectedTab === 2 && monthView}
      </div>
    </main>
  );
};

export default CalendarMain;
