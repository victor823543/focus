import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import BorderAnimationButton from "../components/common/Buttons/BorderAnimationButton/BorderAnimationButton";
import { Container } from "../components/common/Containers/Containers";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import useCreateSession from "../hooks/useCreateSession";
import useSelectSession from "../hooks/useSelectSession";
import { ListSessionsResponse } from "../types/Session";
import { callAPI } from "../utils/apiService";

const Dashboard = () => {
  const createSession = useCreateSession();
  const { selectSession, selectSessions, currentSession } = useSelectSession();

  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => callAPI<ListSessionsResponse>("/sessions", "GET"),
  });

  // const {
  //   data: sessionData,
  //   isLoading: sessionIsLoading,
  //   error: sessionError,
  // } = useQuery({
  //   enabled: !!currentSession && !!data,
  //   ...queryConfig,
  //   queryKey: ["session", currentSession?.id],
  //   queryFn: () => callAPI<Session>(`/sessions/${currentSession?.id}`, "GET"),
  // });

  useEffect(() => {
    if (data && data.length > 0) {
      if (!currentSession) {
        selectSession(data[0]);
      }
      selectSessions(data);
    }
  }, [data]);

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  const sessions = data;
  return (
    <Layout name="Dashboard">
      {sessions.length === 0 && (
        <Container style={{ height: "100%" }} flex="center">
          <BorderAnimationButton onClick={createSession}>
            Create Session
          </BorderAnimationButton>
        </Container>
      )}
    </Layout>
  );
};

export default Dashboard;
