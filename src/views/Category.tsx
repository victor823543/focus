import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import CategoryHeaderSection from "../components/categories/CategoryHeaderSection/CategoryHeaderSection";
import CategoryLayout from "../components/categories/CategoryLayout/CategoryLayout";
import CategoryStatsContent from "../components/categories/CategoryStatsContent/CategoryStatsContent";
import CategoryStatsSection from "../components/categories/CategoryStatsSection/CategoryStatsSection";
import { BreadcrumbItem } from "../components/common/Breadcrumbs/Breadcrumbs";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import { GetCategoryResponse } from "../types/Category";
import { callAPI } from "../utils/apiService";

const Category = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => callAPI<GetCategoryResponse>(`/categories/get/${id}`, "GET"),
  });

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Categories", href: "/categories" },
    { name: "Category", href: `/categories/${id}?tab=week` },
  ];

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Categories">
      <CategoryLayout
        style={
          {
            "--category-main": data.category.color.main,
            "--category-light": data.category.color.light,
            "--category-dark": data.category.color.dark,
          } as React.CSSProperties
        }
        breadcrumbs={breadcrumbs}
        sections={[
          <CategoryHeaderSection
            title={data.category.name}
            color={data.category.color}
            importance={data.category.importance}
          />,
          <CategoryStatsSection
            weekView={
              <CategoryStatsContent
                category={data.category}
                timePeriod="week"
                stats={data.stats.thisWeek}
                dateStats={data.dateStats.thisWeek}
              />
            }
            monthView={
              <CategoryStatsContent
                category={data.category}
                timePeriod="month"
                stats={data.stats.thisMonth}
                dateStats={data.dateStats.thisMonth}
              />
            }
            allTimeView={
              <CategoryStatsContent
                category={data.category}
                timePeriod="all-time"
                stats={data.stats.allTime}
                dateStats={data.dateStats.allTime}
              />
            }
          />,
        ]}
      />
    </Layout>
  );
};

export default Category;
