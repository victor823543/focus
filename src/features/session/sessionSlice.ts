import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateSessionResponse } from "../../types/Session";

interface SessionState {
  selected: CreateSessionResponse | null;
}

const initialState: SessionState = {
  selected: null,
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
  },
  selectors: {
    selectCurrentSession: (session) => session.selected,
  },
});

export const { setSelected, clearSessionState } = sessionSlice.actions;

export const { selectCurrentSession } = sessionSlice.selectors;

export default sessionSlice;
