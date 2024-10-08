import React from "react";
import styles from "./CustomizableButton.module.css";

export type ButtonVariants = "default" | "primary" | "secondary" | "opaque";
export type ButtonSize = "sm" | "base" | "lg" | "xl";

export interface CustomizableButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The variant of the button, which determines its styling. Options are 'default', 'primary', 'secondary', or 'opaque'. */
  variant?: ButtonVariants;

  /** The size of the button. Options are 'sm', 'base', 'lg', or 'xl'. */
  size?: ButtonSize;
}

/**
 * A customizable button component that supports different variants and sizes.
 * The button is styled using CSS modules, allowing for easy theming and consistency.
 *
 * @component
 * @example
 * ```tsx
 * <CustomizableButton variant="primary" size="lg">
 *   Click Me
 * </CustomizableButton>
 * ```
 *
 * @param {string} [variant='default'] - The variant of the button, determining its style. Defaults to 'default'.
 * @param {string} [size='base'] - The size of the button, determining its dimensions. Defaults to 'base'.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} rest - Additional props passed to the button element.
 * @returns {JSX.Element} The rendered button component.
 */

const CustomizableButton: React.FC<CustomizableButtonProps> = ({
  children,
  className,
  variant = "default",
  size = "base",

  ...rest
}) => {
  return (
    <button
      {...rest}
      className={`${className} ${styles.btn} ${styles[variant]} ${styles[size]}`}
    >
      {children}
    </button>
  );
};

export default CustomizableButton;
