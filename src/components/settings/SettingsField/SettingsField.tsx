import React from "react";
import styles from "./SettingsField.module.css";

type SettingsFieldProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  dataCy?: string;
};

const SettingsField: React.FC<SettingsFieldProps> = ({
  children,
  title,
  description,
  dataCy,
}) => {
  return (
    <div className={styles.field}>
      {title && (
        <h2 data-cy={dataCy} className={styles.h2}>
          {title}
        </h2>
      )}
      {description && <p className={styles.p}>{description}</p>}
      {children && (
        <div
          className={`${styles.fieldContent} ${description || title ? styles.margin : ""}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

type SettingsContainerProps = {
  children: React.ReactNode;
};

export const SettingsContainer: React.FC<SettingsContainerProps> = ({
  children,
}) => {
  return <div className={styles.settingsContainer}>{children}</div>;
};

export default SettingsField;
