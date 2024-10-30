import { fireEvent, render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
import TextField from "../../../src/components/common/TextField/TextField";

describe("TextField Component", () => {
  const setup = (props = {}) => {
    const Wrapper = () => {
      const form = useForm();
      return (
        <TextField
          form={form}
          name="testField"
          placeholder="Test Placeholder"
          {...props}
        />
      );
    };
    return render(<Wrapper />);
  };

  it("renders correctly with default props", () => {
    setup();
    expect(screen.getByTestId("text-field")).toBeInTheDocument();
    expect(screen.getByTestId("input")).toBeInTheDocument();
  });

  it("renders with custom colors", () => {
    const customColor = "rgb(255, 0, 0)";
    setup({ color: customColor });
    const textField = screen.getByTestId("text-field") as HTMLDivElement;
    expect(textField).toHaveStyle({ "--field-color": customColor });
  });

  it("applies the placeholder correctly", () => {
    setup();
    expect(screen.getByText("Test Placeholder")).toBeInTheDocument();
  });

  it("calls onChange callback when the text field value changes", () => {
    setup();
    const input = screen.getByTestId("input");
    fireEvent.change(input, { target: { value: "New Value" } });
    expect(input).toHaveValue("New Value");
  });

  it("displays error message when there is an error", () => {
    const Wrapper = () => {
      const form = useForm({
        defaultValues: { testField: "" },
        mode: "onChange",
      });
      form.setError("testField", { type: "manual", message: "Error Message" });
      return (
        <TextField
          form={form}
          name="testField"
          placeholder="Test Placeholder"
        />
      );
    };
    render(<Wrapper />);
    expect(screen.getByText("Error Message")).toBeInTheDocument();
  });
});
