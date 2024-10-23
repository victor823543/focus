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
