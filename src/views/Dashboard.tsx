import { useQuery } from "@tanstack/react-query";
import Loading from "../components/common/Loading/Loading";
import DashboardBarChart from "../components/dashboard/DashboardBarChart/DashboardBarChart";
import DashboardCalendar from "../components/dashboard/DashboardCalendar/DashboardCalendar";
import DashboardCategoryResult from "../components/dashboard/DashboardCategoryResult/DashboardCategoryResult";
import DashboardLayout from "../components/dashboard/DashboardLayout/DashboardLayout";
import DashboardLineChart from "../components/dashboard/DashboardLineChart/DashboardLineChart";
import WeekImprovementBox from "../components/dashboard/WeekImprovementBox/WeekImprovementBox";
import WeekScoreLeftBox from "../components/dashboard/WeekScoreLeftBox/WeekScoreLeftBox";
import Layout from "../components/layout/Layout/Layout";
import useSelectSession from "../hooks/useSelectSession";
import { DashboardDataResponse } from "../types/Dashboard";
import { callAPI } from "../utils/apiService";
import { queryConfig } from "../utils/constants";

const Dashboard = () => {
  const { currentSession } = useSelectSession();

  const { data, isLoading, error } = useQuery({
    enabled: !!currentSession,
    ...queryConfig,
    queryKey: ["dashboard", currentSession?.id],
    queryFn: () =>
      callAPI<DashboardDataResponse>(`/dashboard/${currentSession?.id}`, "GET"),
  });

  console.log(data);

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Dashboard">
      <DashboardLayout
        calendar={<DashboardCalendar />}
        statsTop={
          <DashboardBarChart chartData={data.currentWeekBarChartData} />
        }
        statsBottom={<DashboardLineChart chartData={data.dayTrendChartData} />}
        comparison={
          <WeekImprovementBox
            comparison={data.weekImprovement}
            isFirstWeek={data.isFirstWeek}
          />
        }
        weeklyTarget={
          <WeekScoreLeftBox
            data={data.weekScoreLeft}
            isFirstWeek={data.isFirstWeek}
          />
        }
        categories={
          <DashboardCategoryResult categoryData={data.weekCategoryData} />
        }
      />
    </Layout>
  );
};

export default Dashboard;
