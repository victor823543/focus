import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface CalendarState {
  currentDate: string;
}

// Initial state with the current date
const initialState: CalendarState = {
  currentDate: new Date().toISOString(),
};

// The calendar slice
const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    // Action to set a new date
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.currentDate = action.payload;
    },
    // Move forward one day
    goToNextDay: (state) => {
      const current = new Date(state.currentDate);
      current.setDate(current.getDate() + 1);
      state.currentDate = current.toISOString();
    },
    // Move backward one day
    goToPreviousDay: (state) => {
      const current = new Date(state.currentDate);
      current.setDate(current.getDate() - 1);
      state.currentDate = current.toISOString();
    },
    // Move forward one month
    goToNextMonth: (state) => {
      const current = new Date(state.currentDate);
      current.setMonth(current.getMonth() + 1);
      state.currentDate = current.toISOString();
    },
    // Move backward one month
    goToPreviousMonth: (state) => {
      const current = new Date(state.currentDate);
      current.setMonth(current.getMonth() - 1);
      state.currentDate = current.toISOString();
    },
    // Move forward one week
    goToNextWeek: (state) => {
      const current = new Date(state.currentDate);
      current.setDate(current.getDate() + 7); // Move forward by 7 days
      state.currentDate = current.toISOString();
    },
    // Move backward one week
    goToPreviousWeek: (state) => {
      const current = new Date(state.currentDate);
      current.setDate(current.getDate() - 7); // Move back by 7 days
      state.currentDate = current.toISOString();
    },
  },
  selectors: {
    selectCurrentDate: (calendar) => calendar.currentDate,
  },
});

// Export the actions
export const {
  setCurrentDate,
  goToNextDay,
  goToPreviousDay,
  goToNextMonth,
  goToPreviousMonth,
  goToNextWeek,
  goToPreviousWeek,
} = calendarSlice.actions;

export const { selectCurrentDate } = calendarSlice.selectors;

export default calendarSlice;
