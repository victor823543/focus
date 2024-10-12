import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateCategoryParams } from "../../types/Category";

interface SessionState {
  categories: Array<Partial<CreateCategoryParams>>;
  customCategories: Array<Partial<CreateCategoryParams>>;
}

const initialState: SessionState = {
  categories: [],
  customCategories: [],
};

const configurationSlice = createSlice({
  name: "configuration",
  initialState,
  reducers: {
    addCategory: (
      state,
      action: PayloadAction<Partial<CreateCategoryParams>>,
    ) => {
      state.categories = [...state.categories, action.payload];
    },
    addCustomCategory: (
      state,
      action: PayloadAction<Partial<CreateCategoryParams>>,
    ) => {
      state.customCategories = [...state.customCategories, action.payload];
      state.categories = [...state.categories, action.payload];
    },
    removeCategory: (
      state,
      action: PayloadAction<Partial<CreateCategoryParams>>,
    ) => {
      state.categories = [...state.categories].filter((category) => {
        if (category.name !== action.payload.name) return category;
      });
    },
    updateCategory: (
      state,
      action: PayloadAction<Partial<CreateCategoryParams>>,
    ) => {
      state.categories = [...state.categories].filter((category) => {
        if (category.name !== action.payload.name) {
          return category;
        } else {
          return action.payload;
        }
      });
    },

    clearCategoryState: (state) => {
      return initialState;
    },
  },
  selectors: {
    selectConfigCategories: (session) => session.categories,
    selectCustomConfigCategories: (session) => session.customCategories,
  },
});

export const {
  addCategory,
  removeCategory,
  updateCategory,
  clearCategoryState,
  addCustomCategory,
} = configurationSlice.actions;

export const { selectConfigCategories, selectCustomConfigCategories } =
  configurationSlice.selectors;

export default configurationSlice;
