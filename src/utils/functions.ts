import { Day } from "../types/Day";

// Functions for Dates
export const dateToInputFormat = (dateString: string) => {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export function toYMD(date: Date | string | number): string {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

type DateFormat = "clean" | "short" | "medium" | "long" | "full" | "custom";

interface CustomFormatOptions {
  weekday?: "narrow" | "short" | "long";
  year?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "narrow" | "short" | "long";
  day?: "numeric" | "2-digit";
}

export function formatDate(
  date: Date,
  format: DateFormat,
  customOptions?: CustomFormatOptions,
): string {
  const optionsMap: { [key in DateFormat]: Intl.DateTimeFormatOptions } = {
    clean: { month: "short", day: "numeric" },
    short: { year: "2-digit", month: "2-digit", day: "2-digit" },
    medium: { year: "numeric", month: "short", day: "numeric" },
    long: { year: "numeric", month: "long", day: "numeric" },
    full: { weekday: "long", year: "numeric", month: "long", day: "numeric" },
    custom: customOptions || {},
  };

  const options = optionsMap[format];

  return new Intl.DateTimeFormat("en-US", options).format(date);
}

export function filterByDateRange(arr: Day[], start: Date, end: Date) {
  const result = [];

  for (let item of arr) {
    const itemDate = new Date(item.date);

    // Skip items before the start date
    if (itemDate < start) continue;

    // Stop processing if the item date exceeds the end date
    if (itemDate > end) break;

    // Add the item to the result if it's within the date range
    result.push(item);
  }

  return result;
}

export function resetToMidnight(date: Date): Date {
  // Create a new Date object to avoid mutating the original date
  const newDate = new Date(date);

  // Set hours, minutes, seconds, and milliseconds to 0
  newDate.setHours(0, 0, 0, 0);

  return newDate;
}

// Functions for numbers
export const to1Dec = (number: number) => Math.round(number * 10) / 10;

// Functions for objects
export function createRecordFromRange(
  start: number,
  end: number,
): Record<number, boolean> {
  const record: Record<number, boolean> = {};

  for (let i = start; i <= end; i++) {
    record[i] = false;
  }

  return record;
}
