import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { BreadcrumbItem } from "../components/common/Breadcrumbs/Breadcrumbs";
import Loading from "../components/common/Loading/Loading";
import Layout from "../components/layout/Layout/Layout";
import DayStatsCategories from "../components/stats/DayStatsCategories/DayStatsCategories";
import DayStatsCharts from "../components/stats/DayStatsCharts/DayStatsCharts";
import DayStatsHeader from "../components/stats/DayStatsHeader/DayStatsHeader";
import DayStatsMain from "../components/stats/DayStatsMain/DayStatsMain";
import NoStatsSection from "../components/stats/NoStatsSection/NoStatsSection";
import StatsLayout from "../components/stats/StatsLayout/StatsLayout";
import { useHandleSearchParam } from "../hooks/useHandleSearchParam";
import useSelectSession from "../hooks/useSelectSession";
import { DayStatsResponse } from "../types/Stats";
import { callAPI } from "../utils/apiService";
import { queryConfig } from "../utils/constants";
import { toYMD } from "../utils/functions";

const breadcrumbs: BreadcrumbItem[] = [
  { name: "Stats", href: "/stats" },
  { name: "Day Stats", href: `/stats/day` },
];

const Daystats = () => {
  const { currentSession } = useSelectSession();
  const { currentValue, addParam } = useHandleSearchParam(
    "date",
    toYMD(new Date()),
  );

  useEffect(() => addParam(), []);

  const { data, isLoading, error } = useQuery({
    enabled: !!currentSession && !!currentValue,
    ...queryConfig,
    queryKey: ["stats", currentSession?.id, currentValue],
    queryFn: () =>
      callAPI<DayStatsResponse>(
        `/stats/day/${currentSession?.id}/${currentValue}`,
        "GET",
      ),
  });

  console.log(data);

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Layout name="Stats">
      {data.status === "exists" &&
        data.day &&
        data.dayComparisonInfo &&
        data.dayHorizontalBarChartData &&
        data.dayTrendChartData && (
          <StatsLayout
            breadcrumbs={breadcrumbs}
            sections={[
              <DayStatsHeader sessionInfo={data.sessionInfo} />,
              <DayStatsMain
                day={data.day}
                dayComparisonInfo={data.dayComparisonInfo}
                dayTrendChartData={data.dayTrendChartData}
              />,
              <DayStatsCharts
                chartData={data.dayHorizontalBarChartData}
                day={data.day}
              />,
              <DayStatsCategories
                day={data.day}
                dayComparisonInfo={data.dayComparisonInfo}
              />,
            ]}
          />
        )}
      {data.status === "not_exists" && (
        <StatsLayout
          breadcrumbs={breadcrumbs}
          sections={[
            <DayStatsHeader sessionInfo={data.sessionInfo} />,
            <NoStatsSection />,
          ]}
        />
      )}
    </Layout>
  );
};

export default Daystats;
