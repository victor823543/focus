import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StaticCircularProgress } from "../../../src/components/common/CircularProgress/CircularProgress";

describe("StaticCircularProgress Component", () => {
  it("renders correctly with default props", () => {
    render(
      <StaticCircularProgress size={100} strokeWidth={10} pathLength={0.5} />,
    );

    const svgElement = screen.getByTestId("circular-progress-svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    render(
      <StaticCircularProgress
        size={100}
        strokeWidth={10}
        pathLength={0.5}
        color="red"
        backgroundColor="blue"
      />,
    );

    const pathElement = screen
      .getByTestId("circular-progress-svg")
      .querySelector("circle:nth-of-type(2)");
    expect(pathElement).toHaveAttribute("stroke", "red");

    const circleElement = screen
      .getByTestId("circular-progress-svg")
      .querySelector("circle:nth-of-type(1)");
    expect(circleElement).toHaveAttribute("stroke", "blue");
  });

  it("correctly controls the path length", () => {
    render(
      <StaticCircularProgress size={100} strokeWidth={10} pathLength={0.75} />,
    );

    const pathElement = screen
      .getByTestId("circular-progress-svg")
      .querySelector("circle:nth-of-type(2)");
    const radius = (100 - 10) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - 0.75);

    expect(pathElement).toHaveAttribute("stroke-dashoffset", offset.toString());
  });

  it("renders children inside the component", () => {
    render(
      <StaticCircularProgress size={100} strokeWidth={10} pathLength={0.5}>
        <span>Progress</span>
      </StaticCircularProgress>,
    );

    const childElement = screen.getByText("Progress");
    expect(childElement).toBeInTheDocument();
  });
});
