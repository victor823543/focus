import { useQuery } from "@tanstack/react-query";
import { BreadcrumbItem } from "../components/common/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/common/Containers/Containers";
import { Header } from "../components/common/Headers/Headers";
import Link from "../components/common/Link/Link";
import Loading from "../components/common/Loading/Loading";
import { Modal, ModalWrapperBlur } from "../components/common/Modals/Modals";
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
      {data.data.length > 0 && (
        <StatsLayout breadcrumbs={breadcrumbs} sections={[<StatsMain />]} />
      )}

      {data.data.length === 0 && (
        <ModalWrapperBlur noPointerEvents>
          <Modal>
            <Container paddingX="lg" gap="lg" style={{ maxWidth: "30rem" }}>
              <Header variant="secondary">
                Start entering your data to view stats
              </Header>
              <Link style={{ fontSize: "1.2rem" }} to="/calendar?tab=day">
                Enter day data
              </Link>
            </Container>
          </Modal>
        </ModalWrapperBlur>
      )}
    </Layout>
  );
};

export default Stats;
