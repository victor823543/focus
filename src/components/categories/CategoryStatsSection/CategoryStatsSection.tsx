import React, { useEffect } from "react";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import LineTabs from "../../common/LineTabs/LineTabs";
import styles from "./CategoryStatsSection.module.css";

const tabs = [
  { label: "Weekly Stats", id: "week" },
  { label: "Monthly Stats", id: "month" },
  { label: "Alltime Stats", id: "all-time" },
];

type CategoryStatsSectionProps = {
  weekView: React.ReactNode;
  monthView: React.ReactNode;
  allTimeView: React.ReactNode;
};
const CategoryStatsSection: React.FC<CategoryStatsSectionProps> = ({
  weekView,
  monthView,
  allTimeView,
}) => {
  const { addParam, currentValue, setParam } = useHandleSearchParam(
    "tab",
    "week",
  );

  useEffect(() => addParam(), []);

  return (
    <main>
      <LineTabs
        tabs={tabs}
        selected={currentValue || "week"}
        setSelected={(tab) => setParam(tab)}
        color="var(--category-main)"
      />
      <div className={styles.viewWrapper}>
        {currentValue === "week" && weekView}
        {currentValue === "month" && monthView}
        {currentValue === "all-time" && allTimeView}
      </div>
    </main>
  );
};

export default CategoryStatsSection;
