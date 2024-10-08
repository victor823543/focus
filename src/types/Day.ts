export type Day = {
  id: string;
  session: string;
  date: string;
  score: Array<CategoryScore>;
  totalScore: number;
  maxScore: number;
  percentageScore: number;
  timestamp: number;
};

export type CategoryScore = {
  category: string;
  score: number;
  calculatedScore: number;
  importance: number;
};

export type ListDaysReturn = Record<string, Day>;

export type CreateDayParams = {
  session: string;
  date: string;
  categoryScore: CreateCateforyScoreParams[];
};

export type CreateCateforyScoreParams = {
  category: string;
  score: number;
};

export type UpdateDayParams = {
  categoryScore: CreateCateforyScoreParams[];
};

export enum DayStatus {
  MissingResult,
  WaitingResult,
  HasResult,
  Before,
  After,
}

export type DayStatusList = Record<string, DayStatus>;
