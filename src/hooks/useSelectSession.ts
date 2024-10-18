import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  selectCurrentSession,
  setSelected,
  setSessions,
} from "../features/session/sessionSlice";
import { CreateSessionResponse } from "../types/Session";

type UseSelectSessionReturn = {
  selectSession: (session: CreateSessionResponse | null) => void;
  selectSessions: (sessions: CreateSessionResponse[]) => void;
  currentSession: CreateSessionResponse | null;
  sessions: CreateSessionResponse[];
};

const useSelectSession = (): UseSelectSessionReturn => {
  const currentSession = useSelector((state: RootState) =>
    selectCurrentSession(state),
  );
  const sessions = useSelector((state: RootState) => state.session.sessions);
  const dispatch: AppDispatch = useDispatch();

  const selectSession = (session: CreateSessionResponse | null) =>
    dispatch(setSelected(session));

  const selectSessions = (sessions: CreateSessionResponse[]) =>
    dispatch(setSessions(sessions));

  return {
    selectSession,
    selectSessions,
    currentSession,
    sessions,
  };
};

export default useSelectSession;
