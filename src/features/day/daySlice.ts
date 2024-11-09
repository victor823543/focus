import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DayStatusList, ListDaysReturn } from "../../types/Day";

type DayState = {
  dayStatus: DayStatusList;
  completedDays: ListDaysReturn;
};

// Initial state with the current date
const initialState: DayState = {
  dayStatus: {},
  completedDays: {},
};

const daySlice = createSlice({
  name: "day",
  initialState,
  reducers: {
    updateDayStatus: (state, action: PayloadAction<DayStatusList>) => {
      state.dayStatus = { ...state.dayStatus, ...action.payload };
    },
    updateCompletedDays: (state, action: PayloadAction<ListDaysReturn>) => {
      state.completedDays = { ...state.completedDays, ...action.payload };
    },
    clearDayState: (state) => {
      return initialState;
    },
  },
  selectors: {
    selectDayStatus: (dayState) => dayState.dayStatus,
    selectCompletedDays: (dayState) => dayState.completedDays,
  },
});

export const { updateDayStatus, updateCompletedDays, clearDayState } =
  daySlice.actions;

export const { selectDayStatus, selectCompletedDays } = daySlice.selectors;

export default daySlice;
