import { Category } from "../../src/types/Category";
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
