import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  goToNextDay,
  goToNextMonth,
  goToNextWeek,
  goToPreviousDay,
  goToPreviousMonth,
  goToPreviousWeek,
  selectCurrentDate,
  setCurrentDate,
} from "../features/calendar/calendarSlice";
import { DayStatus } from "../types/Day";
import { toYMD } from "../utils/functions";
import useSelectSession from "./useSelectSession";

// Utility Types for readability
type CalendarDate = Date;
type Week = CalendarDate[];
type Month = Week[];

export enum DateStatus {
  ShouldHaveResult,
  CanHaveResult,
  IsBefore,
  IsAfter,
}

// Helper to add or subtract days from a date
export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// Helper function to compare dates (ignores time)
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Helper to start a week (Monday)
const startOfWeek = (date: Date) => {
  const result = new Date(date);
  const day = result.getDay();
  // If the day is Sunday (0), set it to Monday (-6), otherwise adjust to start of Monday
  const diff = (day === 0 ? -6 : 1) - day;
  return addDays(result, diff);
};

// Helper to get start of the month
const startOfMonth = (date: Date) => {
  const result = new Date(date);
  return new Date(result.getFullYear(), result.getMonth(), 1);
};

// Helper to get end of the month
const endOfMonth = (date: Date) => {
  const result = new Date(date);
  return new Date(result.getFullYear(), result.getMonth() + 1, 0);
};

// Convert Date to 'Month Year' string format
const formatMonthYear = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
};

// Get the week number of the year (starting from Monday)
const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1); // January 1st
  const startOfYearDay = startOfYear.getDay(); // Day of the week for January 1st

  // Adjust to ensure the week starts on Monday
  const startOfFirstWeek = startOfYearDay === 0 ? 1 : 8 - startOfYearDay; // First Monday of the year

  // Calculate the number of days between the given date and the start of the year
  const diffInDays = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24),
  );

  // Calculate the week number, adjusting for the start of the first week
  const weekNumber = Math.ceil((diffInDays - startOfFirstWeek + 1) / 7) + 1;

  return weekNumber;
};

// Get the week of a specific date (array of 7 dates)
export const getWeek = (date: Date): Week => {
  const weekStart = startOfWeek(date);
  return Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i));
};

// Get the month of a specific date (array of weeks)
export const getMonth = (date: Date): Month => {
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const weeks: Month = [];
  let currentWeekStart = startOfWeek(start);

  while (currentWeekStart <= end) {
    weeks.push(getWeek(currentWeekStart));
    currentWeekStart = addDays(currentWeekStart, 7);
  }

  return weeks;
};

//   const getMonth = (date: Date): Month => {
//     const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
//     const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
//     const weeks: Month = [];

//     let currentWeek = getWeek(startOfMonth);
//     weeks.push(currentWeek);

//     // Loop to generate weeks for the entire month
//     while (currentWeek[6] < endOfMonth) {
//       const nextWeek = getWeek(addDays(currentWeek[6], 1));
//       weeks.push(nextWeek);
//       currentWeek = nextWeek;
//     }

//     return weeks;
//   };

// Hook
export const useCalendar = () => {
  const { currentSession } = useSelectSession();
  const dispatch = useDispatch();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = useMemo(() => {
    if (currentSession) {
      return new Date(currentSession.start);
    } else return addDays(today, -30);
  }, [currentSession]);
  start.setHours(0, 0, 0, 0);

  // Get the current date from Redux
  const currentDate = new Date(useSelector(selectCurrentDate));

  // Format current month and year
  const currentMonth = formatMonthYear(currentDate);

  // Get the week number for the current date
  const currentWeek = getWeekNumber(currentDate);

  // Get the current week
  const currentWeekDates = getWeek(currentDate);

  // Get the current month
  const currentMonthDates = getMonth(currentDate);

  // Handlers for navigating between days, weeks and months
  const goToNextDayHandler = () => {
    dispatch(goToNextDay());
  };

  const goToPreviousDayHandler = () => {
    dispatch(goToPreviousDay());
  };

  const goToNextWeekHandler = () => {
    dispatch(goToNextWeek());
  };

  const goToPreviousWeekHandler = () => {
    dispatch(goToPreviousWeek());
  };

  const goToNextMonthHandler = () => {
    dispatch(goToNextMonth());
  };

  const goToPreviousMonthHandler = () => {
    dispatch(goToPreviousMonth());
  };

  // Method to update the current date
  const goToDate = (newDate: Date) => {
    dispatch(setCurrentDate(toYMD(newDate)));
  };

  const getDateStatus = (date: Date, hasResult: boolean) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    if (hasResult) return DayStatus.HasResult;
    if (start <= compareDate && today > compareDate) {
      return DayStatus.MissingResult;
    }
    if (isSameDay(compareDate, today)) {
      return DayStatus.WaitingResult;
    }
    if (compareDate > today) {
      return DayStatus.After;
    }
    if (compareDate < today) {
      return DayStatus.Before;
    }
    return DayStatus.Before;
  };

  return {
    currentDate,
    currentMonth,
    currentWeek,
    currentWeekDates,
    currentMonthDates,
    goToNextDay: goToNextDayHandler,
    goToPrevDay: goToPreviousDayHandler,
    goToNextWeek: goToNextWeekHandler,
    goToPrevWeek: goToPreviousWeekHandler,
    goToNextMonth: goToNextMonthHandler,
    goToPrevMonth: goToPreviousMonthHandler,
    goToDate,
    getDateStatus,
  };
};
