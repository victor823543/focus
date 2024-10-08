import { useQuery } from "@tanstack/react-query";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import MiniStatsDisplay from "../components/stats/MiniStatsDisplay/MiniStatsDisplay";
import StatsGrid from "../components/stats/StatsGrid/StatsGrid";
import WeekComparisonBar from "../components/stats/WeekComparisonBar/WeekComparisonBar";
import WeekDataBar from "../components/stats/WeekDataBar/WeekDataBar";
import WeekProgressLine from "../components/stats/WeekProgressLine/WeekProgressLine";
import useSelectSession from "../hooks/useSelectSession";
import { Session } from "../types/Session";
import { callAPI } from "../utils/apiService";
import { queryConfig } from "../utils/constants";

const Stats = () => {
  const { currentSession } = useSelectSession();

  const { data, isLoading, error } = useQuery({
    enabled: !!currentSession,
    ...queryConfig,
    queryKey: ["session", currentSession?.id],
    queryFn: () => callAPI<Session>(`/sessions/${currentSession?.id}`, "GET"),
  });

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Stats">
      <StatsGrid>
        <MiniStatsDisplay data={data.data} categories={data.categories} />
        <WeekDataBar data={data.data} categories={data.categories} />

        <WeekComparisonBar data={data.data} categories={data.categories} />
        <WeekProgressLine data={data.data} categories={data.categories} />
      </StatsGrid>
    </Layout>
  );
};

export default Stats;
