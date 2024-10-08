import { BarDatum } from "@nivo/bar";
import React, { useMemo } from "react";
import { addDays, getWeek } from "../../../hooks/useCalendar";
import useElementSize from "../../../hooks/useElementSize";
import { Category } from "../../../types/Category";
import { Day } from "../../../types/Day";
import { filterByDateRange, to1Dec } from "../../../utils/functions";
import BarChart from "../BarChart/BarChart";
import Legend from "../Legend/Legend";
import StatsBox from "../StatsBox/StatsBox";
import styles from "./WeekComparisonBar.module.css";

type WeekComparisonBarProps = {
  data: Day[];
  categories: Category[];
};

function convertDataToChart(
  data: Day[],
  categories: Category[],
  yName: string,
  scoreType: "normal" | "calculated" = "normal",
  resultType: "average" | "total" = "average",
): BarDatum[] {
  const thisWeek = getWeek(new Date(data[data.length - 1].date));
  const pastWeek = getWeek(addDays(new Date(data[data.length - 1].date), -7));

  const datesWithinPastWeek = filterByDateRange(
    data,
    pastWeek[0],
    pastWeek[thisWeek.length - 1],
  );

  const datesWithinThisWeek = filterByDateRange(
    data,
    thisWeek[0],
    thisWeek[thisWeek.length - 1],
  );

  const datesWithinWeeks = [...datesWithinPastWeek, ...datesWithinThisWeek];

  const lengthThisWeek = datesWithinThisWeek.length;
  const lengthPastWeek = datesWithinPastWeek.length;

  const categoryObj = categories.reduce<Record<string, BarDatum>>(
    (acc, category) => {
      acc[category.id] = {
        [yName]: category.name,
      };
      return acc;
    },
    {},
  );

  datesWithinWeeks.forEach((day) => {
    const week = thisWeek.map((date) => date.toISOString()).includes(day.date)
      ? "This week"
      : "Past week";
    day.score.forEach((score) => {
      if (categoryObj[score.category][week]) {
        categoryObj[score.category][week] =
          Number(categoryObj[score.category][week]) +
          (scoreType === "normal"
            ? score.score
            : to1Dec(score.calculatedScore));
      } else {
        categoryObj[score.category][week] =
          scoreType === "normal" ? score.score : to1Dec(score.calculatedScore);
      }
    });
  });

  const convertedData = Object.values(categoryObj);

  if (resultType === "average") {
    const averageData: BarDatum[] = convertedData.map((data) => {
      const newObject: BarDatum = { ...data };
      Object.entries(data).forEach(([key, value]) => {
        const weekLength =
          key === "This week" ? lengthThisWeek : lengthPastWeek;
        if (typeof value === "number") {
          newObject[key] = to1Dec(value / weekLength);
        }
      });
      return newObject;
    });
    return averageData;
  }

  return convertedData;
}

const WeekComparisonBar: React.FC<WeekComparisonBarProps> = ({
  data,
  categories,
}) => {
  const [legendSize, legendRef] = useElementSize<HTMLDivElement>();
  const [wrapperSize, wrapperRef] = useElementSize<HTMLDivElement>();
  const chartHeight = `${wrapperSize.height - legendSize.height}px`;
  const chartWidth = `${wrapperSize.width - legendSize.width}px`;
  const scoreType: "normal" | "calculated" = "normal";
  const indexBy = "category";

  const chartData: BarDatum[] = useMemo(
    () => convertDataToChart(data, categories, indexBy, scoreType),
    [data, categories, scoreType],
  );

  const keys = ["This week", "Past week"];
  const colors = ["var(--primary-color)", "var(--primary-color-x-light)"];
  const legend = [
    { title: keys[0], color: colors[0] },
    { title: keys[1], color: colors[1] },
  ];
  const maxValue = "auto";
  const margin = { top: 20, right: 10, bottom: 40, left: 85 };

  return (
    <StatsBox
      title="Week Bar Chart"
      chart={
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
          <div className={styles.chartWrapper}>
            <BarChart
              chartData={chartData}
              categories={categories}
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
      }
    />
  );
};

export default WeekComparisonBar;
