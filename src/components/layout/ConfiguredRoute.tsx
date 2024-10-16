import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useSelectSession from "../../hooks/useSelectSession";
import { useAuth } from "../../provider/authProvider";
import { ListSessionsResponse } from "../../types/Session";
import { callAPI } from "../../utils/apiService";
import Loading from "../common/Loading/Loading";

export const ConfiguredRoute: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentSession, selectSession } = useSelectSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    enabled: !!user,
    queryFn: () => callAPI<ListSessionsResponse>("/sessions", "GET"),
  });

  useEffect(() => {
    // If user is null, navigate to login
    if (user === null) {
      navigate("/login", { replace: true });
      return;
    }

    // If data is still loading, do nothing
    if (isLoading) {
      return;
    }

    // Navigate to configuration if no session has been configured
    if ((!isLoading && data && data.length === 0 && !currentSession) || error) {
      navigate("/configuration");
    }

    // If no current session is selected and data is available, select the latest session
    if (currentSession === null && data && data.length > 0) {
      selectSession(data[data.length - 1]);
    }
  }, [user, currentSession, data, error, isLoading, navigate, selectSession]);

  // Show loading spinner if user or session is not ready
  if (isLoading || !user) {
    return <Loading />;
  }

  // If user and session are ready, render the child components
  return <Outlet />;
};
