import useElementSize from "../../../hooks/useElementSize";
import { DayHorizontalBarChartData, DayRelevant } from "../../../types/Stats";
import BarChart from "../BarChart/BarChart";
import Legend from "../Legend/Legend";
import RadarChart from "../RadarChart/RadarChart";
import styles from "./DayStatsCharts.module.css";

type DayStatsChartsProps = {
  chartData: DayHorizontalBarChartData;
  day: DayRelevant;
};

const DayStatsCharts: React.FC<DayStatsChartsProps> = ({ chartData, day }) => {
  const [legendSize, legendRef] = useElementSize<HTMLDivElement>();
  const [wrapperSize, wrapperRef] = useElementSize<HTMLDivElement>();
  const chartHeight = `${wrapperSize.height - legendSize.height}px`;
  const chartWidth = `${wrapperSize.width - legendSize.width}px`;
  const scoreType: "normal" | "calculated" = "normal";
  const indexBy = "category";

  const keys = ["This Day", "Average", "Yesterday", "Previous Week"];
  const colors = [
    "var(--primary-color-mid)",
    "var(--primary-color)",
    "var(--primary-color-light)",
    "var(--primary-color-x-light)",
  ];

  const colorsRadar = [
    "var(--primary-color)",
    "var(--green)",
    "var(--teal)",
    "var(--sky)",
  ];
  const legend = [
    { title: keys[0], color: colors[0] },
    { title: keys[1], color: colors[1] },
    { title: keys[2], color: colors[2] },
    { title: keys[3], color: colors[3] },
  ];
  const legendRadar = [
    { title: keys[0], color: colorsRadar[0] },
    { title: keys[1], color: colorsRadar[1] },
    { title: keys[2], color: colorsRadar[2] },
    { title: keys[3], color: colorsRadar[3] },
  ];
  const maxValue = "auto";
  const margin = { top: 20, right: 10, bottom: 40, left: 85 };
  return (
    <div>
      <div className={styles.chartsSection}>
        <div
          ref={wrapperRef}
          className={styles.wrapper}
          style={
            {
              "--chartHeight": chartHeight,
              "--chartWidth": chartWidth,
            } as React.CSSProperties
          }
        >
          <h2 className={styles.h2}>Comparison Chart</h2>
          <div className={styles.chartWrapper}>
            <BarChart
              chartData={chartData}
              categories={day.categories}
              keys={keys}
              indexBy={indexBy}
              maxValue={maxValue}
              groupMode="grouped"
              layout="horizontal"
              colors={colors}
              margin={margin}
            />
          </div>
          <div ref={legendRef}>
            <Legend legends={legend} className={styles.legend} />
          </div>
        </div>
        <div
          className={styles.wrapper}
          style={
            {
              "--chartHeight": chartHeight,
              "--chartWidth": chartWidth,
            } as React.CSSProperties
          }
        >
          <h2 className={styles.h2}>Comparison Radar</h2>
          <div className={styles.chartWrapper}>
            <RadarChart
              chartData={chartData}
              keys={keys}
              indexBy={indexBy}
              colors={colorsRadar}
            />
          </div>
          <div ref={legendRef}>
            <Legend legends={legendRadar} className={styles.legend} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayStatsCharts;
