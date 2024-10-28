export const queryConfig = {
  // staleTime: Infinity,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export const chartTheme = {
  text: { fill: "var(--gray)", fontFamily: "Open Sans" },
  grid: { line: { stroke: "var(--gray-x-light)" } },
};

export const chartThemeSecondary = {
  text: { fill: "var(--gray)", fontFamily: "Open Sans" },
  grid: { line: { stroke: "var(--gray-light)" } },
};

export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const weekdaysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
