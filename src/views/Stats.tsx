import { useQuery } from "@tanstack/react-query";
import { Container } from "../components/common/Containers/Containers";
import { Header } from "../components/common/Headers/Headers";
import Link from "../components/common/Link/Link";
import Loading from "../components/common/Loading/Loading";
import {
  Modal,
  ModalWrapperTransparent,
} from "../components/common/Modals/Modals";
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

  console.log(data);

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Stats">
      {data.data.length > 0 && (
        <StatsGrid>
          <MiniStatsDisplay data={data.data} categories={data.categories} />
          <WeekDataBar data={data.data} categories={data.categories} />

          <WeekComparisonBar data={data.data} categories={data.categories} />
          <WeekProgressLine data={data.data} categories={data.categories} />
        </StatsGrid>
      )}
      {data.data.length === 0 && (
        <ModalWrapperTransparent noPointerEvents>
          <Modal>
            <Container paddingX="lg" gap="lg" style={{ maxWidth: "30rem" }}>
              <Header variant="secondary">
                Start entering your data to view stats
              </Header>
              <Link style={{ fontSize: "1.2rem" }} to="/calendar?tab=Day">
                Enter day data
              </Link>
            </Container>
          </Modal>
        </ModalWrapperTransparent>
      )}
    </Layout>
  );
};

export default Stats;
