import React from "react";
import styles from "./Headers.module.css";

type HeaderProps = React.HTMLProps<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "primary" | "secondary" | "gridbox" | "landing" | "config";
  center?: boolean;
};

export const Header: React.FC<HeaderProps> = ({
  as: Tag = "h1",
  variant = "primary",
  children,
  center = true,
  className = "",
  ...rest
}) => {
  return (
    <Tag
      className={`${styles.header} ${styles[variant]} ${center ? styles.center : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};
