import { useSearchParams } from "react-router-dom";

type UseHandleSearchParamReturn = {
  hasParam: boolean;
  addParam: () => void;
  setParam: (newValue: string) => void;
  removeParam: () => void;
  currentValue: string | null;
};

export const useHandleSearchParam = (
  param: string,
  value: string | undefined = "true",
): UseHandleSearchParamReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hasParam = searchParams.has(param);
  const currentValue = searchParams.get(param);

  const addParam = () => {
    if (!hasParam) {
      searchParams.set(param, value);
      setSearchParams(searchParams);
    }
  };

  const setParam = (newValue: string) => {
    if (hasParam) {
      searchParams.set(param, newValue);
      setSearchParams(searchParams);
    }
  };

  const removeParam = () => {
    if (hasParam) {
      searchParams.delete(param);
      setSearchParams(searchParams);
    }
  };

  return {
    hasParam,
    addParam,
    setParam,
    removeParam,
    currentValue,
  };
};
