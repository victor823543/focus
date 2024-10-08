import React from "react";
import styles from "./Section.module.css";

const Section: React.FC<React.HTMLProps<HTMLElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <section className={`${styles.section} ${className}`} {...rest}>
      {children}
    </section>
  );
};

export default Section;
