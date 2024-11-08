import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CustomizableButton, {
  ButtonSize,
  ButtonVariants,
} from "../../../src/components/common/Buttons/CustomizableButton";
import styles from "../../../src/components/common/Buttons/CustomizableButton.module.css";

describe("CustomizableButton Component", () => {
  const setup = (props = {}) => {
    return render(
      <CustomizableButton {...props}>Test Button</CustomizableButton>,
    );
  };

  it("renders correctly with default props", () => {
    setup();
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass(
      `${styles.btn} ${styles.default} ${styles.base}`,
    );
  });

  it("renders with different variants", () => {
    const variants: ButtonVariants[] = [
      "default",
      "primary",
      "secondary",
      "opaque",
      "wide",
      "warning",
      "strong-warning",
    ];
    variants.forEach((variant) => {
      setup({ variant });
      const buttons = screen.getAllByRole("button", { name: /test button/i });
      buttons.forEach((button, index) => {
        expect(button).toHaveClass(
          `${styles.btn} ${styles[variants[index]]} ${styles.base}`,
        );
      });
    });
  });

  it("renders with different sizes", () => {
    const sizes: ButtonSize[] = ["sm", "base", "lg", "xl"];
    sizes.forEach((size) => {
      setup({ size });
      const buttons = screen.getAllByRole("button", { name: /test button/i });
      buttons.forEach((button, index) => {
        expect(button).toHaveClass(
          `${styles.btn} ${styles.default} ${styles[sizes[index]]}`,
        );
      });
    });
  });

  it("calls onClick callback when the button is clicked", () => {
    const handleClick = vi.fn();
    setup({ onClick: handleClick });
    const button = screen.getByRole("button", { name: /test button/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("passes additional props correctly to the button element", () => {
    setup({ "data-testid": "custom-button", disabled: true });
    const button = screen.getByTestId("custom-button");
    expect(button).toBeDisabled();
  });
});
