import { fireEvent, render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";
import TextArea from "../../../src/components/common/TextArea/TextArea";

describe("TextArea Component", () => {
  const renderComponent = (props = {}) => {
    const Wrapper = () => {
      const form = useForm();
      return (
        <FormProvider {...form}>
          <TextArea name="test" form={form} {...props} />
        </FormProvider>
      );
    };
    return render(<Wrapper />);
  };

  it("renders the text area correctly with default props", () => {
    renderComponent();

    const textArea = screen.getByRole("textbox");
    expect(textArea).toBeInTheDocument();
    expect(textArea).toHaveStyle({
      "--area-color": "var(--text-primary)",
      "--area-bg": "transparent",
    });
  });

  it("renders the text area with custom colors and background", () => {
    renderComponent({ color: "red", bg: "blue" });

    const textArea = screen.getByRole("textbox");
    expect(textArea).toHaveStyle({
      "--area-color": "red",
      "--area-bg": "blue",
    });
  });

  it("applies the placeholder correctly", () => {
    renderComponent({ placeholder: "Enter text here" });

    const textArea = screen.getByPlaceholderText("Enter text here");
    expect(textArea).toBeInTheDocument();
  });

  it("calls onChangeCallback when the text area value changes", () => {
    const onChangeCallback = vi.fn();
    renderComponent({ onChangeCallback });

    const textArea = screen.getByRole("textbox");
    fireEvent.change(textArea, { target: { value: "New value" } });

    expect(onChangeCallback).toHaveBeenCalled();
  });

  it("displays the error message when there is an error", () => {
    const Wrapper = () => {
      const form = useForm({
        defaultValues: { test: "" },
        mode: "onChange",
      });
      form.setError("test", { type: "manual", message: "Error message" });

      return (
        <FormProvider {...form}>
          <TextArea name="test" form={form} />
        </FormProvider>
      );
    };

    render(<Wrapper />);

    const errorMessage = screen.getByText("Error message");
    expect(errorMessage).toBeInTheDocument();
  });
});
