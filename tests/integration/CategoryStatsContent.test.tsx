import { cleanup, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CategoryStatsContent from "../../src/components/categories/CategoryStatsContent/CategoryStatsContent";
import {
  Category,
  CategoryPeriodDateStats,
  CategoryPeriodStats,
  CategoryStats,
} from "../../src/types/Category";
import { mockGetCategoryResponse } from "../mocks/mockData";

vi.mock("@nivo/line", () => ({
  ResponsiveLine: () => <div>Nivo Chart Mock</div>,
  Serie: () => ({}),
}));

const mockCategory: Category = mockGetCategoryResponse.category;

describe("CategoryStatsContent Component", () => {
  const renderComponent = (timePeriod: "week" | "month" | "all-time") => {
    let mockStats: CategoryPeriodStats;
    switch (timePeriod) {
      case "week":
        mockStats = mockGetCategoryResponse.stats.thisWeek;
        break;
      case "month":
        mockStats = mockGetCategoryResponse.stats.thisMonth;
        break;
      case "all-time":
        mockStats = mockGetCategoryResponse.stats.allTime;
        break;
    }

    let mockDateStats: CategoryPeriodDateStats;
    switch (timePeriod) {
      case "week":
        mockDateStats = mockGetCategoryResponse.dateStats.thisWeek;
        break;
      case "month":
        mockDateStats = mockGetCategoryResponse.dateStats.thisMonth;
        break;
      case "all-time":
        mockDateStats = mockGetCategoryResponse.dateStats.allTime;
        break;
    }

    render(
      <CategoryStatsContent
        timePeriod={timePeriod}
        category={mockCategory}
        stats={mockStats}
        dateStats={mockDateStats}
        totalDays={mockGetCategoryResponse.totalDays}
      />,
    );
  };

  it("renders correctly", () => {
    renderComponent("week");
    expect(screen.getByText("Total Score")).toBeInTheDocument();
    expect(screen.getByText("Avg. Score")).toBeInTheDocument();
    expect(screen.getByText("Total Calculated Score")).toBeInTheDocument();
    expect(screen.getByText("Avg. Calculated Score")).toBeInTheDocument();
  });

  it("renders StatsBox components with correct titles and stats", async () => {
    const testStatsBox = async (timePeriod: "week" | "month" | "all-time") => {
      cleanup();
      renderComponent(timePeriod);
      const convertTimePeriod = {
        week: "thisWeek",
        month: "thisMonth",
        "all-time": "allTime",
      };
      const stats =
        mockGetCategoryResponse.stats[
          convertTimePeriod[timePeriod] as keyof CategoryStats
        ];
      const totalScoreElement = await screen
        .findByText("Total Score")
        .then((el) => el.nextSibling);
      expect(totalScoreElement).toHaveTextContent(stats.totalScore.toString());
      const avgScoreElement = await screen
        .findByText("Avg. Score")
        .then((el) => el.nextSibling);
      expect(avgScoreElement).toHaveTextContent(stats.averageScore.toString());
      const totalCalculatedScoreElement = await screen
        .findByText("Total Calculated Score")
        .then((el) => el.nextSibling);
      expect(totalCalculatedScoreElement).toHaveTextContent(
        stats.totalCalculatedScore.toString(),
      );
      const avgCalculatedScoreElement = await screen
        .findByText("Avg. Calculated Score")
        .then((el) => el.nextSibling);
      expect(avgCalculatedScoreElement).toHaveTextContent(
        stats.averageCalculatedScore.toString(),
      );
    };

    await testStatsBox("week");
    await testStatsBox("month");
    await testStatsBox("all-time");
  });

  const testCategoryLineChart = async (
    timePeriod: "week" | "month" | "all-time",
  ) => {
    cleanup();
    renderComponent(timePeriod);
    expect(screen.getByText("Basic Score Category Chart")).toBeInTheDocument();
    expect(
      screen.getByText("Calculated Score Category Chart"),
    ).toBeInTheDocument();
  };

  it("renders CategoryLineChart components correctly for all views", async () => {
    await testCategoryLineChart("week");
    await testCategoryLineChart("month");
    await testCategoryLineChart("all-time");
  });
});
