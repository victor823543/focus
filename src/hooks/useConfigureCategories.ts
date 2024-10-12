import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import {
  addCategory,
  addCustomCategory,
  removeCategory,
  selectConfigCategories,
  selectCustomConfigCategories,
  updateCategory,
} from "../features/configuration/configurationSlice";
import { CreateCategoryParams } from "../types/Category";

type UseConfigureCategoriesReturn = {
  currentConfigCategories: Array<Partial<CreateCategoryParams>>;
  customConfigCategories: Array<Partial<CreateCategoryParams>>;
  addConfigCategory: (category: Partial<CreateCategoryParams>) => void;
  addCustomConfigCategory: (category: Partial<CreateCategoryParams>) => void;
  updateConfigCategory: (category: Partial<CreateCategoryParams>) => void;
  removeConfigCategory: (category: Partial<CreateCategoryParams>) => void;
};

const useConfigureCategories = (): UseConfigureCategoriesReturn => {
  const currentConfigCategories = useSelector((state: RootState) =>
    selectConfigCategories(state),
  );
  const customConfigCategories = useSelector((state: RootState) =>
    selectCustomConfigCategories(state),
  );

  const dispatch: AppDispatch = useDispatch();

  const addConfigCategory = (category: Partial<CreateCategoryParams>) =>
    dispatch(addCategory(category));
  const updateConfigCategory = (category: Partial<CreateCategoryParams>) =>
    dispatch(updateCategory(category));
  const removeConfigCategory = (category: Partial<CreateCategoryParams>) =>
    dispatch(removeCategory(category));
  const addCustomConfigCategory = (category: Partial<CreateCategoryParams>) =>
    dispatch(addCustomCategory(category));

  return {
    currentConfigCategories,
    customConfigCategories,
    addConfigCategory,
    updateConfigCategory,
    removeConfigCategory,
    addCustomConfigCategory,
  };
};

export default useConfigureCategories;
