import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  selectCurrentSession,
  setSelected,
} from "../features/session/sessionSlice";
import { CreateSessionResponse } from "../types/Session";

type UseSelectSessionReturn = {
  selectSession: (session: CreateSessionResponse) => void;
  currentSession: CreateSessionResponse | null;
};

const useSelectSession = (): UseSelectSessionReturn => {
  const currentSession = useSelector((state: RootState) =>
    selectCurrentSession(state),
  );
  const dispatch: AppDispatch = useDispatch();

  const selectSession = (session: CreateSessionResponse) =>
    dispatch(setSelected(session));

  return {
    selectSession,
    currentSession,
  };
};

export default useSelectSession;
