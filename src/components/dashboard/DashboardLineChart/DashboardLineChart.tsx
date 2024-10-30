import { ResponsiveLine } from "@nivo/line";
import React from "react";
import { DayTrendChartData } from "../../../types/Stats";
import { chartTheme } from "../../../utils/constants";
import { calculateTickValues } from "../../../utils/functions";
import styles from "./DashboardLineChart.module.css";

type DashboardLineChartProps = {
  chartData: DayTrendChartData;
  maxScore: number;
};

const DashboardLineChart: React.FC<DashboardLineChartProps> = ({
  chartData,
  maxScore,
}) => {
  const calculatedMaxValue = Math.max(...chartData[0].data.map((d) => d.y));
  const maxValue = calculatedMaxValue > 0 ? calculatedMaxValue : maxScore;
  const tickValues = calculateTickValues(maxValue);
  return (
    <div>
      <h2 className={styles.h2}>Latest Trend</h2>
      <div className={styles.chartWrapper}>
        <ResponsiveLine
          data={chartData}
          margin={{ top: 10, right: 30, bottom: 35, left: 40 }}
          curve="cardinal"
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: 0,
            max: maxValue,
            stacked: false,
          }}
          enableGridX={false}
          gridYValues={tickValues}
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
            tickValues: tickValues,
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
