import { ResponsiveLine } from "@nivo/line";
import React from "react";
import useElementSize from "../../../hooks/useElementSize";
import {
  DayComparisonInfo,
  DayRelevant,
  DayTrendChartData,
} from "../../../types/Stats";
import { chartTheme } from "../../../utils/constants";
import { formatDate, to1Dec } from "../../../utils/functions";
import styles from "./DayStatsMain.module.css";

type DayStatsMainProps = {
  day: DayRelevant;
  dayComparisonInfo: DayComparisonInfo;
  dayTrendChartData: DayTrendChartData;
};

const DayStatsMain: React.FC<DayStatsMainProps> = ({
  day,
  dayComparisonInfo,
  dayTrendChartData,
}) => {
  const [wrapperSize, wrapperRef] = useElementSize<HTMLDivElement>();
  const [displayBoxSize, displayBoxRef] = useElementSize<HTMLDivElement>({
    includePadding: true,
  });
  return (
    <main className={styles.main}>
      <h2 className={styles.h2}>{formatDate(new Date(day.date), "medium")}</h2>
      <div className={styles.statsSection}>
        <StatsBox title="Rank among days:" stat={dayComparisonInfo.rank} />
        <StatsBox
          title="Percent less than best day:"
          stat={`${to1Dec(-dayComparisonInfo.distanceFromBest)}%`}
        />
        <StatsBox
          title="Score less than best day:"
          stat={to1Dec(-dayComparisonInfo.scoreDistanceFromBest)}
        />
        <StatsBox
          title={"Score compared to average:"}
          stat={`${to1Dec(dayComparisonInfo.distanceFromAverage)}`}
        />
      </div>
      <div
        className={styles.sectionWrapper}
        ref={wrapperRef}
        style={
          {
            "--wrapper-width": `${wrapperSize.width}px`,
            "--box-height": `${displayBoxSize.height}px`,
          } as React.CSSProperties
        }
      >
        <div className={styles.topPercentSection}>
          <div className={styles.displayBox} ref={displayBoxRef}>
            <p className={styles.p}>
              {formatDate(new Date(day.date), "long")} is in the top
            </p>
            <h3 className={styles.h3}>
              {to1Dec(dayComparisonInfo.topPercentage)}%
            </h3>
            <p className={styles.p}>of all days logged.</p>
          </div>
        </div>
        <div className={styles.chartWrapper}>
          <ResponsiveLine
            data={dayTrendChartData}
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
    </main>
  );
};

const StatsBox: React.FC<{ title: string; stat: string | number }> = ({
  title,
  stat,
}) => {
  return (
    <div className={styles.statsBox}>
      <p className={styles.description}>{title}</p>
      <h2 className={styles.data}>{stat}</h2>
    </div>
  );
};

export default DayStatsMain;
