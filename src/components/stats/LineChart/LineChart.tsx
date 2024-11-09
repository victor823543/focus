import { ResponsiveLine, Serie } from "@nivo/line";
import React from "react";
import { Category } from "../../../types/Category";
import { chartTheme } from "../../../utils/constants";

type LineChartProps = {
  chartData: Serie[];
  categories: Category[];
  maxValue: number | "auto";
};

function setColor(id: string, categories: Category[]) {
  const color =
    categories.find((category) => id === category.name)?.color.main ||
    "var(--primary-color)";
  return `hsl(from ${color} h s calc(l + 10))`;
}

const LineChart: React.FC<LineChartProps> = ({
  chartData,
  categories,
  maxValue,
}) => {
  return (
    <ResponsiveLine
      data={chartData}
      margin={{ top: 20, right: 15, bottom: 40, left: 30 }}
      curve="cardinal"
      xScale={{ type: "point" }}
      yScale={{ type: "linear", min: 0, max: maxValue, stacked: false }}
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
      colors={(id) => setColor(id.id, categories)}
      lineWidth={3}
      enablePoints={false}
      useMesh={true}
      enableSlices="x"
      theme={chartTheme}
    />
  );
};

export default LineChart;
