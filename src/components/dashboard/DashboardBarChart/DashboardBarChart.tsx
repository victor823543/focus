import { ResponsiveBar } from "@nivo/bar";
import useElementSize from "../../../hooks/useElementSize";
import { CurrentWeekBarChartData } from "../../../types/Dashboard";
import { chartTheme } from "../../../utils/constants";
import { calculateTickValues } from "../../../utils/functions";
import Legend from "../../stats/Legend/Legend";
import styles from "./DashboardBarChart.module.css";

type DashboardBarChartProps = {
  chartData: CurrentWeekBarChartData;
  maxScore: number;
};

const DashboardBarChart: React.FC<DashboardBarChartProps> = ({
  chartData,
  maxScore,
}) => {
  const [legendSize, legendRef] = useElementSize<HTMLDivElement>();
  const [wrapperSize, wrapperRef] = useElementSize<HTMLDivElement>();
  const chartHeight = `${wrapperSize.height - legendSize.height}px`;
  const chartWidth = `${wrapperSize.width - legendSize.width}px`;
  const indexBy = "weekday";

  const calculatedMaxValue = chartData.reduce((acc, cur) => {
    const totalScore = cur["Total Score"];
    const previousWeek = cur["Previous Week"];
    return Math.max(acc, totalScore, previousWeek);
  }, 0);

  const maxValue = calculatedMaxValue > 0 ? calculatedMaxValue : maxScore;

  const gridValues = calculateTickValues(maxValue);

  const keys = ["Total Score", "Previous Week"];
  const colors = ["var(--primary-color)", "var(--primary-color-x-light)"];
  const legend = [
    { title: keys[0], color: colors[0] },
    { title: keys[1], color: colors[1] },
  ];

  const margin = { top: 20, right: 10, bottom: 40, left: 40 };
  return (
    <div
      className={styles.wrapper}
      style={
        {
          "--chartHeight": chartHeight,
          "--chartWidth": chartWidth,
        } as React.CSSProperties
      }
    >
      <h2 className={styles.h2}>Current Week Chart</h2>
      <div className={styles.chartWrapper} ref={wrapperRef}>
        <ResponsiveBar
          data={chartData}
          keys={keys}
          indexBy={indexBy}
          margin={margin}
          padding={0.3}
          valueScale={{ type: "linear", min: 0, max: maxValue }}
          indexScale={{ type: "band", round: true }}
          gridYValues={gridValues}
          colors={colors}
          layout={"vertical"}
          groupMode={"grouped"}
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
            tickValues: gridValues,
          }}
          enableLabel={false}
          theme={chartTheme}
        />
      </div>
      <div ref={legendRef}>
        <Legend legends={legend} className={styles.legend} />
      </div>
    </div>
  );
};

export default DashboardBarChart;
