import { useMemo, useState } from "react";
import { DayStatus } from "../types/Day";
import { toYMD } from "../utils/functions";
import { getWeek } from "./useCalendar";
import useSelectSession from "./useSelectSession";

type UseTemporalCalendarReturn = {
  selected: string;
  selectedDate: Date;
  today: string;
  selectedWeek: string[];
  goToPrevWeek: () => void;
  goToNextWeek: () => void;
  selectDay: (date: string) => void;
  getDateStatus: (date: string, hasResult: boolean) => DayStatus;
};

export const useTemporalCalendar = (): UseTemporalCalendarReturn => {
  const { currentSession } = useSelectSession();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const todayDate = new Date();

  const start = useMemo(() => {
    if (currentSession) {
      return new Date(currentSession.start);
    } else return addDays(todayDate, -30);
  }, [currentSession]);
  start.setHours(0, 0, 0, 0);

  const selected = useMemo(() => toYMD(selectedDate), [selectedDate]);
  const today = useMemo(() => toYMD(todayDate), [todayDate]);

  const selectedWeek: string[] = useMemo(() => {
    const weekDates = getWeek(selectedDate);
    const week = weekDates.map((date) => toYMD(date));
    return week;
  }, [selectedDate]);

  const goToPrevWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const selectDay = (date: string) => {
    setSelectedDate(new Date(date));
  };

  const getDateStatus = (date: string, hasResult: boolean) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    if (hasResult) return DayStatus.HasResult;
    if (toYMD(new Date()) === date) {
      return DayStatus.WaitingResult;
    }
    if (start <= compareDate && todayDate > compareDate) {
      return DayStatus.MissingResult;
    }
    if (compareDate > todayDate) {
      return DayStatus.After;
    }
    if (compareDate < todayDate) {
      return DayStatus.Before;
    }
    return DayStatus.Before;
  };

  return {
    selectedDate,
    selected,
    today,
    selectedWeek,
    goToPrevWeek,
    goToNextWeek,
    selectDay,
    getDateStatus,
  };
};
