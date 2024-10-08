import { BarDatum } from "@nivo/bar";
import React, { useMemo } from "react";
import useElementSize from "../../../hooks/useElementSize";
import { Category } from "../../../types/Category";
import { Day } from "../../../types/Day";
import { weekdaysShort } from "../../../utils/constants";
import { to1Dec } from "../../../utils/functions";
import BarChart from "../BarChart/BarChart";
import Legend from "../Legend/Legend";
import StatsBox from "../StatsBox/StatsBox";
import styles from "./WeekDataBar.module.css";

type WeekDataBarProps = {
  data: Day[];
  categories: Category[];
};

function convertDataToChart(
  data: Day[],
  categories: Category[],
  yName: string,
  scoreType: "normal" | "calculated" = "normal",
): BarDatum[] {
  const convertedData: BarDatum[] = data.map((day) => {
    const dayObj: Record<string, string | number> = {
      [yName]:
        weekdaysShort[
          new Date(day.date).getDay() > 0 ? new Date(day.date).getDay() - 1 : 6
        ],
    };
    day.score.forEach((categoryScore) => {
      const category: Category | undefined = categories.find(
        (cat) => cat.id === categoryScore.category,
      );
      if (category) {
        dayObj[category.name] =
          scoreType === "normal"
            ? categoryScore.score
            : to1Dec(categoryScore.calculatedScore);
        dayObj[category.name + "Color"] = category.color.hex;
      }
    });
    return dayObj;
  });
  return convertedData;
}

const WeekDataBar: React.FC<WeekDataBarProps> = ({ data, categories }) => {
  const [legendSize, legendRef] = useElementSize<HTMLDivElement>();
  const [wrapperSize, wrapperRef] = useElementSize<HTMLDivElement>();
  const chartHeight = `${wrapperSize.height - legendSize.height}px`;
  const chartWidth = `${wrapperSize.width - legendSize.width}px`;
  const scoreType = "normal";
  const indexBy = "weekday";

  const chartData: BarDatum[] = useMemo(
    () => convertDataToChart(data.slice(-7), categories, indexBy, scoreType),
    [data, categories, scoreType],
  );

  const keys = useMemo(
    () => categories.map((category) => category.name),
    [categories],
  );

  const legend = useMemo(
    () => keys.map((key) => ({ title: key, color: setColor(key, categories) })),
    [keys, categories],
  );

  const maxValue = useMemo(() => {
    if (scoreType === "normal") {
      return categories.length * 10;
    } else {
      return data[0].maxScore;
    }
  }, [categories, data]);

  return (
    <StatsBox
      title="Week Bar Chart"
      height="23rem"
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

function setColor(id: string | number, categories: Category[]) {
  const color =
    categories.find((category) => id === category.name)?.color.hex || "#676767";
  return `hsl(from ${color} h s calc(l + 10))`;
}

export default WeekDataBar;
