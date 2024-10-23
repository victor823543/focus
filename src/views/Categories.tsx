import { useQuery } from "@tanstack/react-query";
import CategoriesGrid from "../components/categories/CategoriesGrid/CategoriesGrid";
import CreateCategory from "../components/categories/CreateCategory/CreateCategory";
import UserCategories from "../components/categories/UserCategories/UserCategories";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import { useHandleSearchParam } from "../hooks/useHandleSearchParam";
import useSelectSession from "../hooks/useSelectSession";
import { Category } from "../types/Category";
import { callAPI } from "../utils/apiService";

const Categories = () => {
  const { hasParam } = useHandleSearchParam("create");
  const { currentSession } = useSelectSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", currentSession?.id],
    enabled: !!currentSession,
    queryFn: () =>
      callAPI<Array<Category>>(`/categories/list/${currentSession?.id}`, "GET"),
  });

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Categories">
      {hasParam && <CreateCategory />}
      <CategoriesGrid>
        <UserCategories categories={data} />
      </CategoriesGrid>
    </Layout>
  );
};

export default Categories;
