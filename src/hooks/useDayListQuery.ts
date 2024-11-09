import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateCompletedDays, updateDayStatus } from "../features/day/daySlice";
import { DayStatusList, ListDaysReturn } from "../types/Day";
import { callAPI } from "../utils/apiService";
import { useCalendar } from "./useCalendar";
import useSelectSession from "./useSelectSession";

type UseDayListQueryReturn = {
  refetchDayList: () => void;
};

const useDayListQuery = (): UseDayListQueryReturn => {
  const dispatch = useDispatch();
  const { currentDate } = useCalendar();
  const queryClient = useQueryClient();

  const monthOffset = useMemo(() => {
    const current = currentDate.getMonth();
    const now = new Date().getMonth();
    const offset = current - now;
    return offset ? `?monthOffset=${offset}` : "";
  }, [currentDate]);

  const { currentSession } = useSelectSession();

  const { data, isLoading, error } = useQuery<ListDaysReturn>({
    enabled: !!currentDate && !!currentSession,
    queryKey: ["session", currentSession?.id],
    queryFn: () => callAPI(`/days/${currentSession?.id}${monthOffset}`, "GET"),
  });

  useEffect(() => {
    if (data) {
      dispatch(updateCompletedDays(data));
      let newDayStatus: DayStatusList = {};
      dispatch(updateDayStatus(newDayStatus));
    }
  }, [data]);

  const refetchDayList = () => {
    queryClient.invalidateQueries({
      queryKey: ["session", currentSession?.id],
    });
  };
  return {
    refetchDayList,
  };
};

export default useDayListQuery;
