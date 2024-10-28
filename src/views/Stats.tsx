import { useQuery } from "@tanstack/react-query";
import { BreadcrumbItem } from "../components/common/Breadcrumbs/Breadcrumbs";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import StatsLayout from "../components/stats/StatsLayout/StatsLayout";
import StatsMain from "../components/stats/StatsMain/StatsMain";
import useSelectSession from "../hooks/useSelectSession";
import { Session } from "../types/Session";
import { callAPI } from "../utils/apiService";
import { queryConfig } from "../utils/constants";

const breadcrumbs: BreadcrumbItem[] = [{ name: "Stats", href: "/stats" }];

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
      <StatsLayout breadcrumbs={breadcrumbs} sections={[<StatsMain />]} />
    </Layout>
  );
};

export default Stats;
