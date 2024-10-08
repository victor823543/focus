import { useQuery } from "@tanstack/react-query";
import CalendarDayView from "../components/calendar/CalendarDayView/CalendarDayView";
import CalendarMain from "../components/calendar/CalendarMain/CalendarMain";
import CalendarMonthView from "../components/calendar/CalendarMonthView/CalendarMonthView";
import CalendarWeekView from "../components/calendar/CalendarWeekView/CalendarWeekView";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import { useCalendar } from "../hooks/useCalendar";
import useSelectSession from "../hooks/useSelectSession";
import { ListDaysReturn } from "../types/Day";
import { callAPI } from "../utils/apiService";
import { queryConfig } from "../utils/constants";

const Calendar = () => {
  const { currentSession } = useSelectSession();
  const { currentDate } = useCalendar();
  const { data, isLoading, error } = useQuery<ListDaysReturn>({
    enabled: !!currentSession,
    ...queryConfig,
    queryKey: ["days", currentSession?.id],
    queryFn: () => callAPI(`/days/all/${currentSession?.id}`, "GET"),
  });

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Calendar" padding={false}>
      <CalendarMain
        dayView={
          <CalendarDayView key={currentDate.toISOString()} days={data} />
        }
        weekView={<CalendarWeekView />}
        monthView={<CalendarMonthView days={data} />}
      />
    </Layout>
  );
};

export default Calendar;
