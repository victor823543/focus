export type Category = {
  id: string;
  user: string;
  name: string;
  importance: number;
  color: { name: string; hex: string };
  timestamp: number;
};

export type CreateCategoryParams = {
  name: string;
  importance: number;
  color: { name: string; hex: string };
};

export type Color = {
  name: string;
  hex: string;
};
