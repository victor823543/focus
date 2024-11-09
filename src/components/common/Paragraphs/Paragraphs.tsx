import React from "react";
import styles from "./Paragraphs.module.css";

type ParagraphProps = React.HTMLProps<HTMLParagraphElement> & {
  variant?: "primary" | "secondary" | "bold";
  center?: boolean;
};

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  variant = "primary",
  center = true,
  ...rest
}) => {
  return (
    <p
      className={`${styles.p} ${styles[variant]} ${center ? styles.center : ""}`}
      {...rest}
    >
      {children}
    </p>
  );
};
