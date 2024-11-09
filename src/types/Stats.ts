import { Category, CategoryPeriodDateStats } from "./Category";
import { CategoryScore } from "./Day";

export type DayStatsResponse = {
  status: "exists" | "not_exists";
  day?: DayRelevant;
  dayComparisonInfo?: DayComparisonInfo;
  dayHorizontalBarChartData?: DayHorizontalBarChartData;
  sessionInfo: SessionStatsInfo;
  dayTrendChartData?: DayTrendChartData;
};

export type CategoriesInfo = Record<
  string,
  {
    id: string;
    name: string;
    dateStats: CategoryPeriodDateStats;
    average: AverageCategoryScore;
  }
>;

export type SessionStatsInfo = {
  bestDay: DayRelevant;
  worstDay: DayRelevant;
  totalDays: number;
  totalScore: number;
};

export type DayRelevant = {
  id: string;
  date: string;
  categories: Category[];
  score: Array<CategoryScore>;
  totalScore: number;
  maxScore: number;
  percentageScore: number;
  timestamp: number;
};

export type AverageCategoryScore = {
  avgScore: number;
  avgCalculatedScore: number;
  avgFraction: number;
};

export type DayHorizontalBarChartData = Array<{
  category: string;
  "This Day": number;
  Yesterday: number;
  "Previous Week": number;
  Average: number;
}>;

export type DayComparisonInfo = {
  topPercentage: number;
  distanceFromAverage: number;
  rank: number;
  distanceFromBest: number;
  scoreDistanceFromBest: number;
};

export type DayTrendChartData = Array<{
  id: string;
  data: Array<{
    x: string;
    y: number;
  }>;
}>;
