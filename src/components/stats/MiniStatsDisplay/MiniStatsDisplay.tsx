import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { useMemo } from "react";
import { addDays, getWeek } from "../../../hooks/useCalendar";
import { Category } from "../../../types/Category";
import { Day } from "../../../types/Day";
import { filterByDateRange } from "../../../utils/functions";
import StatsBox from "../StatsBox/StatsBox";
import styles from "./MiniStatsDisplay.module.css";

type WeekDataBarProps = {
  data: Day[];
  categories: Category[];
};

type CategoryObject = Record<string, number>;

type CategoryArray = {
  category: string;
  score: number;
}[];

type CategoryIncrease = {
  category: string;
  increase: number;
  percentage: number;
};

const MiniStatsDisplay: React.FC<WeekDataBarProps> = ({ data, categories }) => {
  const latestDate = new Date(data[data.length - 1].date);
  const aWeekAgo = addDays(latestDate, -7);

  const thisWeek = getWeek(latestDate);
  const pastWeek = getWeek(aWeekAgo);

  const datesWithinPastWeek = useMemo(
    () => filterByDateRange(data, pastWeek[0], aWeekAgo),
    [data],
  );

  const datesWithinThisWeek = useMemo(
    () => filterByDateRange(data, thisWeek[0], latestDate),
    [data],
  );

  const thisWeekTotal = useMemo(
    () => datesWithinThisWeek.reduce((value, day) => day.totalScore + value, 0),
    [datesWithinThisWeek],
  );
  const pastWeekTotal = useMemo(
    () => datesWithinPastWeek.reduce((value, day) => day.totalScore + value, 0),
    [datesWithinPastWeek],
  );

  const thisWeekCategoryObject: CategoryObject = useMemo(
    () => createCategoryObject(datesWithinThisWeek, categories),
    [datesWithinThisWeek, categories],
  );
  const pastWeekCategoryObject: CategoryObject = useMemo(
    () => createCategoryObject(datesWithinPastWeek, categories),
    [datesWithinPastWeek, categories],
  );

  const thisWeekCategoryTotal = useMemo(
    () => createSortedArray(thisWeekCategoryObject),
    [thisWeekCategoryObject],
  );

  const pastWeekCategoryTotal = useMemo(
    () => createSortedArray(pastWeekCategoryObject),
    [pastWeekCategoryObject],
  );

  const bestCategoryThisWeek =
    thisWeekCategoryTotal[thisWeekCategoryTotal.length - 1];
  const bestCategoryPastWeek =
    pastWeekCategoryObject[bestCategoryThisWeek.category];
  const worstCategoryThisWeek = thisWeekCategoryTotal[0];
  const worstCategoryPastWeek =
    pastWeekCategoryObject[worstCategoryThisWeek.category];
  const bestCategoryComparison =
    (bestCategoryThisWeek.score / bestCategoryPastWeek - 1) * 100;
  const worstCategoryComparison =
    (worstCategoryThisWeek.score / worstCategoryPastWeek - 1) * 100;

  const categoryIncrease: CategoryIncrease = useMemo(() => {
    const increases: Array<CategoryIncrease> = [];
    for (let category of categories) {
      const increase =
        thisWeekCategoryObject[category.name] -
        pastWeekCategoryObject[category.name];
      const percentage =
        (thisWeekCategoryObject[category.name] /
          pastWeekCategoryObject[category.name] -
          1) *
        100;
      increases.push({ category: category.name, increase, percentage });
    }
    const sortedIncreases = increases.sort((a, b) => b.increase - a.increase);
    return sortedIncreases[0];
  }, [thisWeekCategoryObject, pastWeekCategoryObject]);

  return (
    <StatsBox
      title="Week Statistics"
      height="23rem"
      chart={
        <div className={styles.wrapper}>
          <MiniStats
            number={Math.round(thisWeekTotal).toString()}
            description="Total score this week"
            difPercent={Math.round((thisWeekTotal / pastWeekTotal - 1) * 100)}
            color="var(--blue)"
            bgColor="var(--blue-light-tr)"
            icon={<RectangleStackIcon />}
          />
          <MiniStats
            number={Math.round(bestCategoryThisWeek.score).toString()}
            description={`Best category: ${bestCategoryThisWeek.category}`}
            difPercent={Math.round(bestCategoryComparison)}
            color="var(--primary-color)"
            bgColor="var(--primary-color-light-tr)"
            icon={<HandThumbUpIcon />}
          />
          <MiniStats
            number={Math.round(worstCategoryThisWeek.score).toString()}
            description={`Worst category: ${worstCategoryThisWeek.category}`}
            difPercent={Math.round(worstCategoryComparison)}
            color="var(--orange)"
            bgColor="var(--orange-light-tr)"
            icon={<HandThumbDownIcon />}
          />
          <MiniStats
            number={Math.round(categoryIncrease.increase).toString()}
            description={`Highest increase: ${categoryIncrease.category}`}
            difPercent={Math.round(categoryIncrease.percentage)}
            color="var(--purple)"
            bgColor="var(--purple-light-tr)"
            icon={<ArrowTrendingUpIcon />}
          />
        </div>
      }
    />
  );
};

type MiniStatsProps = {
  number: string;
  description: string;
  difPercent: number;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
};

const MiniStats: React.FC<MiniStatsProps> = ({
  number,
  description,
  difPercent,
  color,
  bgColor,
  icon,
}) => {
  return (
    <div
      style={
        { "--box-color": color, "--box-bg": bgColor } as React.CSSProperties
      }
      className={`${styles.box}`}
    >
      <div className={styles.iconContainer}>{icon}</div>

      <h2 className={styles.stat}>{number}</h2>
      <p className={styles.description}>{description}</p>
      <p className={styles.comparison}>{difPercent}% from last week</p>
    </div>
  );
};

function createCategoryObject(days: Day[], categories: Category[]) {
  const categoryObj = categories.reduce<Record<string, number>>(
    (acc, category) => {
      acc[category.name] = 0;
      return acc;
    },
    {},
  );

  days.forEach((day) => {
    day.score.forEach((categoryScore) => {
      const categoryName =
        categories.find((cat) => cat.id === categoryScore.category)?.name || "";
      categoryObj[categoryName] += categoryScore.score;
    });
  });
  return categoryObj;
}

function createSortedArray(categoryObj: CategoryObject): CategoryArray {
  const categoryArray = Object.entries(categoryObj).map(
    ([category, score]) => ({ category: category, score: score }),
  );
  const sortedArray = categoryArray.sort((a, b) => a.score - b.score);
  return sortedArray;
}

export default MiniStatsDisplay;
