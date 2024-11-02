import { ConfigureFormFields } from "../../src/views/Configuration";

export const mockUser = {
  username: "testuser",
  email: "user@example.com",
  _id: "1",
  timestamp: 1633072800000,
};

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
    user: "user1",
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
    user: "user1",
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
