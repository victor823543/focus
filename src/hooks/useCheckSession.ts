import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ListSessionsResponse } from "../types/Session";
import { callAPI } from "../utils/apiService";
import useSelectSession from "./useSelectSession";

const useCheckSession = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentSession, selectSession } = useSelectSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    enabled: !!user,
    queryFn: () => callAPI<ListSessionsResponse>("/sessions", "GET"),
  });

  useEffect(() => {
    if (user === null) {
      navigate("/login");
      return;
    }

    if (isLoading) return;

    if ((data && data.length === 0) || error) {
      navigate("/configuration");
    } else if (currentSession === null && data && data.length > 0) {
      selectSession(data[data.length - 1]);
    }
  }, [user, currentSession, data, error, isLoading, navigate, selectSession]);

  return { isLoading, user, currentSession };
};

export default useCheckSession;
