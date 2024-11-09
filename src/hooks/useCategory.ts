import { useMutation } from "@tanstack/react-query";
import { CreateCategoryParams } from "../types/Category";
import { callAPI } from "../utils/apiService";

type UseCategoryReturn = {
  createCategory: (params: CreateCategoryParams) => void;
};

const useCategory = (): UseCategoryReturn => {
  const createMutation = useMutation({
    mutationFn: (params: CreateCategoryParams) =>
      callAPI("/categories/create", "POST", params),
  });

  const createCategory = (params: CreateCategoryParams) => {
    createMutation.mutate(params);
  };

  return { createCategory };
};

export default useCategory;
