import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LineTabs from "../../../src/components/common/LineTabs/LineTabs";
import styles from "../../../src/components/common/LineTabs/LineTabs.module.css";

describe("LineTabs Component", () => {
  const tabs = [
    { label: "Tab 1", id: "tab1" },
    { label: "Tab 2", id: "tab2" },
  ];
  const mockSetSelected = vi.fn();

  it("renders all provided tabs", () => {
    render(
      <LineTabs tabs={tabs} selected="tab1" setSelected={mockSetSelected} />,
    );

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
  });

  it("highlights the selected tab", () => {
    render(
      <LineTabs tabs={tabs} selected="tab1" setSelected={mockSetSelected} />,
    );

    const selectedTab = screen.getByTestId("tab-tab1");
    expect(selectedTab).toHaveClass(styles.selected);
  });

  it("calls setSelected with the correct id when a tab is clicked", () => {
    render(
      <LineTabs tabs={tabs} selected="tab1" setSelected={mockSetSelected} />,
    );

    const tab2 = screen.getByText("Tab 2");
    fireEvent.click(tab2);

    expect(mockSetSelected).toHaveBeenCalledWith("tab2");
  });

  it("applies the custom color to the selected tab's line", () => {
    const customColor = "rgb(255, 0, 0)";
    render(
      <LineTabs
        tabs={tabs}
        selected="tab1"
        setSelected={mockSetSelected}
        color={customColor}
      />,
    );

    const foregroundLine = screen.getByTestId("line-tab1");
    expect(foregroundLine).toHaveStyle({ backgroundColor: customColor });
  });
});
