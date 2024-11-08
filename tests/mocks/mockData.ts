import { Category, GetCategoryResponse } from "../../src/types/Category";
import { CreateSessionResponse } from "../../src/types/Session";
import { ConfigureFormFields } from "../../src/views/Configuration";

export const mockUser = {
  username: "testuser",
  email: "user@example.com",
  _id: "1",
  timestamp: 1633072800000,
};

// Mock data
export const mockSessionCategories: Category[] = [
  {
    id: "1",
    user: "testuser",
    name: "Work",
    importance: 1,
    description: "Tasks related to work projects",
    color: {
      name: "blue",
      main: "#2196F3",
      light: "#BBDEFB",
      dark: "#1976D2",
    },
    timestamp: 1633072800000,
  },
  {
    id: "2",
    user: "testuser",
    name: "Personal",
    importance: 1.5,
    description: "Personal errands and activities",
    color: {
      name: "green",
      main: "#4CAF50",
      light: "#C8E6C9",
      dark: "#388E3C",
    },
    timestamp: 1633072800000,
  },
  {
    id: "3",
    user: "testuser",
    name: "Fitness",
    importance: 3,
    description: "Fitness and health-related activities",
    color: {
      name: "orange",
      main: "#FF9800",
      light: "#FFE0B2",
      dark: "#F57C00",
    },
    timestamp: 1633072800000,
  },
  {
    id: "4",
    user: "testuser",
    name: "Hobbies",
    importance: 2,
    description: "Activities for leisure and hobbies",
    color: {
      name: "purple",
      main: "#9C27B0",
      light: "#E1BEE7",
      dark: "#7B1FA2",
    },
    timestamp: 1633072800000,
  },
  {
    id: "5",
    user: "testuser",
    name: "Study",
    importance: 2,
    color: {
      name: "red",
      main: "#F44336",
      light: "#EF9A9A",
      dark: "#D32F2F",
    },
    timestamp: 1633072800000,
  },
];

export const mockSession: CreateSessionResponse = {
  id: "1",
  title: "Test",
  start: "2021-10-01",
  end: "2021-10-31",
  categories: mockSessionCategories,
  maxScore: 100,
};

export const mockSessions: CreateSessionResponse[] = [
  {
    id: "1",
    title: "Test",
    start: "2021-10-01",
    end: null,
    categories: mockSessionCategories,
    maxScore: 100,
  },
  {
    id: "2",
    title: "Test 2",
    start: "2021-10-01",
    end: null,
    categories: mockSessionCategories,
    maxScore: 100,
  },
  {
    id: "3",
    title: "Test 3",
    start: "2021-10-01",
    end: null,
    categories: [],
    maxScore: 100,
  },
];

export const mockColors = [
  {
    name: "Red",
    main: "#f87171",
    light: "#fecaca",
    dark: "#b91c1c",
  },
  {
    name: "Green",
    main: "#4ade80",
    light: "#bbf7d0",
    dark: "#15803d",
  },
  {
    name: "Blue",
    main: "#60a5fa",
    light: "#bfdbfe",
    dark: "#1d4ed8",
  },
];

export const mockCategories = [
  {
    id: "1",
    user: "testuser",
    name: "Category 1",
    importance: 1,
    color: {
      name: "Gray",
      main: "#9ca3af",
      light: "#e5e7eb",
      dark: "#374151",
    },
    timestamp: 1633072800000,
  },
  {
    id: "2",
    user: "testuser",
    name: "Category 2",
    importance: 1,
    color: {
      name: "Gray",
      main: "#9ca3af",
      light: "#e5e7eb",
      dark: "#374151",
    },
    timestamp: 1633072800000,
  },
];

export const mockConfigurationState = {
  categories: [
    {
      name: "Study",
      importance: 1,
      color: {
        name: "Gray",
        main: "#9ca3af",
        light: "#e5e7eb",
        dark: "#374151",
      },
    },
    {
      name: "Sleep",
      importance: 1,
      color: {
        name: "Gray",
        main: "#9ca3af",
        light: "#e5e7eb",
        dark: "#374151",
      },
    },
    {
      name: "Read",
      importance: 1,
      color: {
        name: "Gray",
        main: "#9ca3af",
        light: "#e5e7eb",
        dark: "#374151",
      },
    },
  ],
  customCategories: [],
};

export const mockEmptyConfigurationForm: ConfigureFormFields = {
  title: "Test",
  categories: [],
  start: "2021-10-01",
  end: null,
};

export const mockGetCategoryResponse: GetCategoryResponse = {
  stats: {
    allTime: {
      totalScore: 34,
      totalCalculatedScore: 74.8,
      averageScore: 5.7,
      averageCalculatedScore: 12.5,
    },
    thisWeek: {
      totalScore: 34,
      totalCalculatedScore: 74.8,
      averageScore: 5.7,
      averageCalculatedScore: 12.5,
    },
    thisMonth: {
      totalScore: 12,
      totalCalculatedScore: 26.4,
      averageScore: 6,
      averageCalculatedScore: 13.2,
    },
  },
  dateStats: {
    allTime: {
      "2024-10-28": {
        score: 7,
        calculatedScore: 15.4,
      },
      "2024-10-29": {
        score: 5,
        calculatedScore: 11,
      },
      "2024-10-30": {
        score: 6,
        calculatedScore: 13.2,
      },
      "2024-10-31": {
        score: 4,
        calculatedScore: 8.8,
      },
      "2024-11-01": {
        score: 4,
        calculatedScore: 8.8,
      },
      "2024-11-02": {
        score: 8,
        calculatedScore: 17.6,
      },
    },
    thisWeek: {
      "2024-10-28": {
        score: 7,
        calculatedScore: 15.4,
      },
      "2024-10-29": {
        score: 5,
        calculatedScore: 11,
      },
      "2024-10-30": {
        score: 6,
        calculatedScore: 13.2,
      },
      "2024-10-31": {
        score: 4,
        calculatedScore: 8.8,
      },
      "2024-11-01": {
        score: 4,
        calculatedScore: 8.8,
      },
      "2024-11-02": {
        score: 8,
        calculatedScore: 17.6,
      },
    },
    thisMonth: {
      "2024-11-01": {
        score: 4,
        calculatedScore: 8.8,
      },
      "2024-11-02": {
        score: 8,
        calculatedScore: 17.6,
      },
    },
  },
  category: {
    user: "671f6c4e325568b9be3caaa6",
    name: "Work",
    importance: 2.2,
    description: "Should work at least 8 hours a day, with a productive day.",
    color: {
      name: "Indigo",
      main: "#818cf8",
      light: "#c7d2fe",
      dark: "#4338ca",
    },
    timestamp: 1730151071,
    id: "6720029fa35bf9442d8771f3",
  },
  totalDays: 6,
};
