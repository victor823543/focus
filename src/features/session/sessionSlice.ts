import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateSessionResponse } from "../../types/Session";

interface SessionState {
  selected: CreateSessionResponse | null;
  sessions: CreateSessionResponse[];
}

const initialState: SessionState = {
  selected: null,
  sessions: [],
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<CreateSessionResponse>) => {
      state.selected = action.payload;
    },
    clearSessionState: (state) => {
      return initialState;
    },
    setSessions: (state, action: PayloadAction<CreateSessionResponse[]>) => {
      state.sessions = action.payload;
    },
  },
  selectors: {
    selectCurrentSession: (session) => session.selected,
    selectSessions: (session) => session.sessions,
  },
});

export const { setSelected, clearSessionState, setSessions } =
  sessionSlice.actions;

export const { selectCurrentSession, selectSessions } = sessionSlice.selectors;

export default sessionSlice;
