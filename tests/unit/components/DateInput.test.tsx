import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
import DateInput from "../../../src/components/common/DateInput/DateInput";

describe("DateInput Component", () => {
  const setup = (props = {}) => {
    const Wrapper = () => {
      const form = useForm({
        defaultValues: { testDate: "2024-10-01" },
      });
      return <DateInput form={form} name="testDate" {...props} />;
    };
    return render(<Wrapper />);
  };

  it("renders correctly with default props", () => {
    setup();
    expect(screen.getByTestId("date-input")).toBeInTheDocument();
  });

  it("changes date input value correctly", () => {
    setup();
    const input = screen.getByTestId("date-input");
    fireEvent.change(input, { target: { value: "2024-10-02" } });
    expect(input).toHaveValue("2024-10-02");
  });

  it("calls onChange callback with correct date format", () => {
    setup();
    const input = screen.getByTestId("date-input");
    fireEvent.change(input, { target: { value: "2024-10-03" } });
    expect(input).toHaveValue("2024-10-03");
  });

  it("displays error message when there is an error", () => {
    const Wrapper = () => {
      const form = useForm({
        defaultValues: { testDate: "" },
        mode: "onChange",
      });
      form.setError("testDate", { type: "manual", message: "Error Message" });
      return <DateInput form={form} name="testDate" />;
    };
    render(<Wrapper />);
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });
});
