import { Serie } from "@nivo/line";
import React, { useMemo, useState } from "react";
import useElementSize from "../../../hooks/useElementSize";
import { Category } from "../../../types/Category";
import { Day } from "../../../types/Day";
import { weekdaysShort } from "../../../utils/constants";
import { to1Dec } from "../../../utils/functions";
import Legend from "../Legend/Legend";
import LineChart from "../LineChart/LineChart";
import StatsBox from "../StatsBox/StatsBox";
import styles from "./WeekProgressLine.module.css";

type WeekProgressLineProps = {
  data: Day[];
  categories: Category[];
};

type PrespecifiedChartData = Record<
  string,
  Array<{
    date: string;
    score: number;
    calculatedScore: number;
  }>
>;

function convertDataToChart(
  data: PrespecifiedChartData,
  categories: Category[],
  timeScope: "month" | "week" = "week",
  scoreType: "normal" | "calculated" = "normal",
  hiddenCategories: Array<string | number>,
): Serie[] {
  const convertedData: Serie[] = [];

  Object.entries(data).forEach(([category, preData]) => {
    const categoryName =
      categories.find((categoryObj) => categoryObj.id === category)?.name ||
      "Average";

    if (hiddenCategories.includes(categoryName)) return;

    const categoryData = preData.map((preCategoryData) => ({
      x:
        timeScope === "month"
          ? new Date(preCategoryData.date).getDate()
          : weekdaysShort[
              new Date(preCategoryData.date).getDay() > 0
                ? new Date(preCategoryData.date).getDay() - 1
                : 6
            ],
      y:
        scoreType === "normal"
          ? to1Dec(preCategoryData.score)
          : to1Dec(preCategoryData.calculatedScore),
    }));

    convertedData.push({
      id: categoryName,
      data: categoryData,
    });
  });
  return convertedData;
}

function createPrespecifiedData(data: Day[]) {
  let categoriesObj: PrespecifiedChartData = {};
  data.slice(-7).forEach((dayData) => {
    dayData.score.forEach((categoryScore) => {
      const newAddition = {
        date: dayData.date,
        score: categoryScore.score,
        calculatedScore: categoryScore.calculatedScore,
      };
      categoriesObj[categoryScore.category] = categoriesObj[
        categoryScore.category
      ]
        ? [...categoriesObj[categoryScore.category], newAddition]
        : [newAddition];
    });

    const totalAddition = {
      date: dayData.date,
      score:
        dayData.score.reduce((value, scoreObj) => value + scoreObj.score, 0) /
        dayData.score.length,
      calculatedScore: dayData.totalScore / dayData.score.length,
    };
    categoriesObj["Average"] = categoriesObj["Average"]
      ? [...categoriesObj["Average"], totalAddition]
      : [totalAddition];
  });
  return categoriesObj;
}

const WeekProgressLine: React.FC<WeekProgressLineProps> = ({
  data,
  categories,
}) => {
  const [legendSize, legendRef] = useElementSize<HTMLDivElement>();
  const [wrapperSize, wrapperRef] = useElementSize<HTMLDivElement>();
  const chartHeight = `${wrapperSize.height - legendSize.height}px`;
  const chartWidth = `${wrapperSize.width - legendSize.width}px`;

  const [hiddenCategories, setHiddenCategories] = useState<
    Array<string | number>
  >([]);
  const timeScope: "month" | "week" = "week";
  const scoreType: "normal" | "calculated" = "normal";

  const prespecifiedData = useMemo(() => createPrespecifiedData(data), [data]);
  const chartData = useMemo(
    () =>
      convertDataToChart(
        prespecifiedData,
        categories,
        timeScope,
        scoreType,
        hiddenCategories,
      ),
    [prespecifiedData, categories, hiddenCategories],
  );

  const maxValue = useMemo(() => {
    if (scoreType === "normal") {
      return 10;
    } else {
      return (
        categories.sort((a, b) => b.importance - a.importance)[0].importance *
        10
      );
    }
  }, [categories, data]);

  const legend = useMemo(() => {
    const legendArray = categories.map((category) => ({
      title: category.name as string,
      color: setColor(category.name as string, categories),
    }));
    return [
      ...legendArray,
      {
        title: "Average",
        color: "var(--primary-color)",
      },
    ];
  }, [categories]);

  const toggleCategory = (name: string) => {
    if (hiddenCategories.includes(name)) {
      setHiddenCategories((prev) =>
        prev.filter((category) => category !== name),
      );
    } else {
      setHiddenCategories((prev) => [...prev, name]);
    }
  };

  return (
    <StatsBox
      title="Week Progress"
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
            <LineChart
              chartData={chartData}
              categories={categories}
              maxValue={maxValue}
            />
          </div>
          <div ref={legendRef}>
            <Legend
              legends={legend}
              className={styles.legend}
              onClick={(categoryName) => toggleCategory(categoryName)}
              hidden={hiddenCategories as string[]}
            />
          </div>
        </div>
      }
    />
  );
};

function setColor(id: string, categories: Category[]) {
  const color =
    categories.find((category) => id === category.name)?.color.main ||
    "var(--primary-color)";
  return `hsl(from ${color} h s calc(l + 10))`;
}

export default WeekProgressLine;
