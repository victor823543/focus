import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { DayTrendChartData } from "../../../types/Stats";
import { chartTheme } from "../../../utils/constants";
import styles from "./DashboardLineChart.module.css";

type DashboardLineChartProps = {
  chartData: DayTrendChartData;
};

const DashboardLineChart: React.FC<DashboardLineChartProps> = ({
  chartData,
}) => {
  return (
    <div>
      <h2 className={styles.h2}>Latest Trend</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 10, right: 40, bottom: 35, left: 40 }}
          curve="cardinal"
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: "auto",
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
          colors={() => "var(--primary-color)"}
          lineWidth={3}
          enablePoints={false}
          useMesh={true}
          enableSlices="x"
          theme={chartTheme}
          enableArea={true}
        />
      </div>
    </div>
  );
};

export default DashboardLineChart;
