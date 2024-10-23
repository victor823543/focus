import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import CategoryHeaderSection from "../components/categories/CategoryHeaderSection/CategoryHeaderSection";
import CategoryLayout from "../components/categories/CategoryLayout/CategoryLayout";
import { BreadcrumbItem } from "../components/common/Breadcrumbs/Breadcrumbs";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import { Category as CategoryT } from "../types/Category";
import { callAPI } from "../utils/apiService";

const Category = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => callAPI<CategoryT>(`/categories/get/${id}`, "GET"),
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Categories", href: "/categories" },
    { name: "Category", href: `/categories/${id}` },
  ];

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Categories">
      <CategoryLayout
        breadcrumbs={breadcrumbs}
        sections={[
          <CategoryHeaderSection
            title={data.name}
            color={data.color}
            importance={data.importance}
          />,
        ]}
      />
    </Layout>
  );
};

export default Category;
