export type Category = {
  id: string;
  user: string;
  name: string;
  importance: number;
  color: Color;
  timestamp: number;
};

export type CreateCategoryParams = {
  name: string;
  importance: number;
  color: Color;
};

export type Color = {
  name: string;
  main: string;
  light: string;
  dark: string;
};

export type CategoryPeriodDateStats = Record<
  string,
  { score: number; calculatedScore: number }
>;

export type CategoryDateStats = {
  allTime: CategoryPeriodDateStats;
  thisWeek: CategoryPeriodDateStats;
  thisMonth: CategoryPeriodDateStats;
};

export type CategoryPeriodStats = {
  totalScore: number;
  totalCalculatedScore: number;
  averageScore: number;
  averageCalculatedScore: number;
};

export type CategoryStats = {
  allTime: CategoryPeriodStats;
  thisWeek: CategoryPeriodStats;
  thisMonth: CategoryPeriodStats;
};

export type GetCategoryResponse = {
  stats: CategoryStats;
  category: Category;
  dateStats: CategoryDateStats;
};
