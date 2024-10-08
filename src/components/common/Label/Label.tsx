import React from "react";
import styles from "./Label.module.css";

const Label: React.FC<React.HTMLProps<HTMLLabelElement>> = ({
  children,
  ...rest
}) => {
  return (
    <label className={styles.label} {...rest}>
      {children}
    </label>
  );
};

export default Label;
