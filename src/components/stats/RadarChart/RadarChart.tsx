import { Theme } from "@nivo/core";
import { Datum } from "@nivo/line";
import { ResponsiveRadar } from "@nivo/radar";
import React from "react";
import { chartThemeSecondary } from "../../../utils/constants";

type RadarChartProps = {
  chartData: Datum[];
  keys: string[];
  indexBy: string;
  colors: any;
  margin?: { top: number; right: number; bottom: number; left: number };
  theme?: Theme;
};

const RadarChart: React.FC<RadarChartProps> = ({
  chartData,
  keys,
  indexBy,
  colors,
  margin = { top: 50, right: 50, bottom: 50, left: 50 },
  theme,
}) => {
  return (
    <ResponsiveRadar
      data={chartData}
      keys={keys}
      indexBy={indexBy}
      valueFormat=">-.2f"
      margin={margin}
      borderColor={{ from: "color" }}
      gridLabelOffset={36}
      enableDots={false}
      colors={colors}
      fillOpacity={0.4}
      blendMode="multiply"
      motionConfig="wobbly"
      theme={theme ? theme : chartThemeSecondary}
    />
  );
};

export default RadarChart;
