import { Category } from "./Category";
import { Day } from "./Day";

export type CreateSessionResponse = {
  id: string;
  title: string;
  start: string;
  end: string | null;
  categories: Array<Category>;
};

export type ListSessionsResponse = CreateSessionResponse[];

export type UpdateSessionResponse = CreateSessionResponse;

export type Session = {
  id: string;
  user: string;
  title: string;
  categories: Array<Category>;
  data: Array<Day>;
  activeDays: Array<number>;
  start: string;
  end: string | null;
  timestamp: number;
};

export type SessionInfo = CreateSessionResponse;

export type CategoryScore = {
  category: string;
  score: number;
  calculatedScore: number;
  importance: number;
};

type SessionUpdateParams = Partial<{
  title: string;
  categories: Array<string>;
  start: string;
  end: string | null;
  activeDays: Array<number>;
}>;
