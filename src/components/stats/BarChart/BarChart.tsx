import { BarDatum, ResponsiveBar } from "@nivo/bar";
import { Theme } from "@nivo/core";
import React from "react";
import { Category } from "../../../types/Category";
import { chartTheme } from "../../../utils/constants";

type BarChartProps = {
  chartData: BarDatum[];
  categories: Category[];
  keys: string[];
  indexBy: string;
  maxValue: number | "auto";
  groupMode?: "stacked" | "grouped";
  layout?: "vertical" | "horizontal";
  colors?: any;
  margin?: { top: number; right: number; bottom: number; left: number };
  theme?: Theme;
};

function setColor(id: string | number, categories: Category[]) {
  const color =
    categories.find((category) => id === category.name)?.color.main ||
    "#676767";
  return `hsl(from ${color} h s calc(l + 10))`;
}

const BarChart: React.FC<BarChartProps> = ({
  chartData,
  categories,
  keys,
  indexBy,
  maxValue,
  groupMode = "stacked",
  layout = "vertical",
  colors,
  margin = { top: 20, right: 10, bottom: 40, left: 30 },
  theme,
}) => {
  return (
    <ResponsiveBar
      data={chartData}
      keys={keys}
      indexBy={indexBy}
      margin={margin}
      padding={0.3}
      valueScale={{ type: "linear", min: 0, max: maxValue }}
      indexScale={{ type: "band", round: true }}
      colors={colors ? colors : (id) => setColor(id.id, categories)}
      layout={layout}
      groupMode={groupMode}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 10,
        tickRotation: 0,
        truncateTickAt: 0,
      }}
      enableLabel={false}
      theme={theme ? theme : chartTheme}
    />
  );
};

export default BarChart;
