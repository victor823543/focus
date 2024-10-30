import { DayTrendChartData } from "./Stats";

export type DashboardDataResponse = {
  currentWeekBarChartData: CurrentWeekBarChartData;
  weekImprovement: number; // percentage
  weekCategoryData: WeekCategoryData;
  dayTrendChartData: DayTrendChartData;
  weekScoreLeft: WeekScoreLeft;
  isFirstWeek: boolean;
};

export type CurrentWeekBarChartData = Array<{
  weekday: string;
  "Total Score": number;
  "Previous Week": number;
}>;

export type WeekCategoryData = Record<
  string,
  {
    totalScore: number;
    maxScore: number;
  }
>;

export type WeekScoreLeft = {
  recordScore: number;
  toRecord: number;
  toRecordPercentage: number;
  avgScoreToRecord: number;
  averageScore: number;
  toAverage: number;
  toAveragePercentage: number;
  avgScoreToAverage: number;
};
