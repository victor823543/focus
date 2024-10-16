import React from "react";
import styles from "./Containers.module.css";

type Entity = "none" | "sm" | "md" | "lg" | "xl";

type ContainerProps = React.HTMLProps<HTMLDivElement> & {
  flex?: "none" | "center" | "align" | "start" | "end";
  direction?: "row" | "col";
  paddingX?: Entity;
  paddingY?: Entity;
  gap?: Entity;
  center?: boolean;
};

const paddingConvert = {
  none: "0",
  sm: ".5rem",
  md: "1rem",
  lg: "2rem",
  xl: "4rem",
};

const gapConvert = {
  none: "0",
  sm: ".25rem",
  md: ".5rem",
  lg: "1rem",
  xl: "2rem",
};

export const Container: React.FC<ContainerProps> = ({
  children,
  flex = "align",
  direction = "col",
  paddingX = "sm",
  paddingY = "sm",
  gap = "sm",
  center = true,
  className = "",
  ...rest
}) => {
  const padding = `${paddingConvert[paddingY]} ${paddingConvert[paddingX]}`;

  return (
    <div
      style={{ padding, gap: gapConvert[gap] }}
      className={`${styles.container} ${styles[`flex-${flex}`]}
        ${styles[direction]}
        ${center ? styles.center : ""}
         ${className}
        `}
      {...rest}
    >
      {children}
    </div>
  );
};
