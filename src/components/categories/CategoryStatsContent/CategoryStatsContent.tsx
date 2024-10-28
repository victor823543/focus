import { ResponsiveLine, Serie } from "@nivo/line";
import React, { useMemo } from "react";
import {
  Category,
  CategoryPeriodDateStats,
  CategoryPeriodStats,
} from "../../../types/Category";
import { chartTheme } from "../../../utils/constants";
import { to1Dec } from "../../../utils/functions";
import styles from "./CategoryStatsContent.module.css";

type TimePeriod = "week" | "month" | "all-time";

type CategoryStatsContentProps = {
  timePeriod: TimePeriod;
  category: Category;
  stats: CategoryPeriodStats;
  dateStats: CategoryPeriodDateStats;
  totalDays: number;
};

const CategoryStatsContent: React.FC<CategoryStatsContentProps> = ({
  timePeriod,
  category,
  stats,
  dateStats,
  totalDays,
}) => {
  const chartDataBasicScore = useMemo(() => {
    return convertDataToChart(
      dateStats,
      timePeriod,
      "score",
      category.name,
      totalDays,
    );
  }, [dateStats, timePeriod, category.name]);

  const chartDataCalculatedScore = useMemo(() => {
    return convertDataToChart(
      dateStats,
      timePeriod,
      "calculatedScore",
      category.name,
      totalDays,
    );
  }, [dateStats, timePeriod, category.name]);
  return (
    <div className={styles.statsContent}>
      <div className={styles.statsSection}>
        <StatsBox title="Total Score" stat={stats.totalScore} />
        <StatsBox title="Avg. Score" stat={stats.averageScore} />
        <StatsBox
          title="Total Calculated Score"
          stat={stats.totalCalculatedScore}
        />
        <StatsBox
          title="Avg. Calculated Score"
          stat={stats.averageCalculatedScore}
        />
      </div>
      <div className={styles.chartSection}>
        <h2 className={styles.h2}>Basic Score Category Chart</h2>
        <CategoryLineChart
          chartData={chartDataBasicScore}
          max={10}
          color={category.color.main}
        />
        <h2 className={styles.h2}>Calculated Score Category Chart</h2>
        <CategoryLineChart
          chartData={chartDataCalculatedScore}
          max={category.importance * 10}
          color={category.color.main}
        />
      </div>
    </div>
  );
};

const StatsBox: React.FC<{ title: string; stat: number }> = ({
  title,
  stat,
}) => {
  return (
    <div className={styles.statsBox}>
      <p className={styles.description}>{title}</p>
      <h2 className={styles.data}>{to1Dec(stat)}</h2>
    </div>
  );
};

const CategoryLineChart: React.FC<{
  chartData: Serie[];
  max: number;
  color: string;
}> = ({ chartData, max, color }) => {
  const hasData = chartData[0].data.length > 0;
  return (
    <div className={`${styles.chartContainer} ${!hasData ? styles.empty : ""}`}>
      {hasData && (
        <ResponsiveLine
          data={chartData}
          margin={{ top: 20, right: 35, bottom: 35, left: 30 }}
          curve="cardinal"
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: max,
            stacked: false,
          }}
          enableGridX={false}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
            legendOffset: 36,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            tickRotation: 0,
          }}
          colors={() => color}
          lineWidth={3}
          enablePoints={false}
          useMesh={true}
          enableSlices="x"
          theme={chartTheme}
          enableArea={true}
        />
      )}
      {!hasData && <p className={styles.noData}>No data available</p>}
    </div>
  );
};

const convertDataToChart = (
  dateStats: CategoryPeriodDateStats,
  timePeriod: TimePeriod,
  type: "score" | "calculatedScore",
  name: string,
  totalDays: number,
): Serie[] => {
  let xValues: string[] = [];
  switch (timePeriod) {
    case "week":
      xValues = Object.keys(dateStats).map((date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString("en-US", { weekday: "short" });
      });
      break;
    case "month":
      xValues = Object.keys(dateStats).map((date) => {
        const dateObj = new Date(date);
        return dateObj.getDate().toString();
      });
      break;
    case "all-time":
      const overallStatsSize =
        totalDays < 10 ? "small" : totalDays < 70 ? "medium" : "large";
      switch (overallStatsSize) {
        case "small":
          xValues = Object.keys(dateStats).map((date) => {
            const formattedDate = new Intl.DateTimeFormat("sv-SE", {
              day: "numeric",
              month: "2-digit",
            }).format(new Date(date));
            return formattedDate;
          });
          break;
        case "medium":
          xValues = Object.keys(dateStats);
          break;
        case "large":
          xValues = Object.keys(dateStats);
          break;
      }
  }
  const data = Object.values(dateStats)
    .filter(
      (_, index) =>
        !(
          timePeriod === "month" &&
          Object.keys(dateStats).length > 15 &&
          index % 2 !== 0
        ),
    )
    .map((statObj, index) => {
      const xValueIndex =
        timePeriod === "month" && Object.keys(dateStats).length > 15
          ? index * 2
          : index;
      return { x: xValues[xValueIndex], y: to1Dec(statObj[type]) };
    });
  const series: Serie[] = [{ id: name, data: data }];
  return series;
};

export default CategoryStatsContent;
