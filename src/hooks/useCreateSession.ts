import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { CreateSessionResponse } from "../types/Session";
import { callAPI } from "../utils/apiService";
import useSelectSession from "./useSelectSession";

type UseCreateSessionReturn = () => void;

const useCreateSession = (): UseCreateSessionReturn => {
  const navigate = useNavigate();
  const { selectSession } = useSelectSession();

  const createMutation = useMutation({
    mutationFn: () =>
      callAPI<CreateSessionResponse>("/sessions/create", "POST"),
    onSuccess: (response) => {
      selectSession(response);
      navigate("/dashboard");
    },
  });

  const createSession = () => {
    createMutation.mutate();
  };

  return createSession;
};

export default useCreateSession;
