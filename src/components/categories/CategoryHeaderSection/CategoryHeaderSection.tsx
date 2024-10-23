import React from "react";
import { Color } from "../../../types/Category";
import { Header } from "../../common/Headers/Headers";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import styles from "./CategoryHeaderSection.module.css";

type CategoryHeaderSectionProps = {
  title: string;
  description?: string;
  importance: number;
  color: Color;
};

const CategoryHeaderSection: React.FC<CategoryHeaderSectionProps> = ({
  title,
  description,
  importance,
  color,
}) => {
  return (
    <div
      className={styles.container}
      style={{ "--hex": color.main } as React.CSSProperties}
    >
      <div className={styles.title}>
        <h1 className={styles.h1}>{title}</h1>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoBox}>
          <span>Importance:</span>
          <span>{importance}</span>
        </div>
        <div className={styles.bar} style={{ backgroundColor: color.light }}>
          <div
            style={{
              width: `${(importance / 3) * 100}%`,
              backgroundColor: color.main,
            }}
            className={styles.barInner}
          ></div>
        </div>
      </div>

      <div className={styles.infoContainer}>
        <div className={styles.infoBox} style={{ width: "100%" }}>
          Color palette
        </div>
        <div className={styles.colorsContainer}>
          <div
            className={styles.color}
            style={{ backgroundColor: color.light } as React.CSSProperties}
          ></div>
          <div
            className={styles.color}
            style={{ backgroundColor: color.main } as React.CSSProperties}
          ></div>
          <div
            className={styles.color}
            style={{ backgroundColor: color.dark } as React.CSSProperties}
          ></div>
        </div>
      </div>
      {description && (
        <div className={styles.description}>
          <Header as="h2" variant="secondary">
            Description
          </Header>
          <Paragraph>{description}</Paragraph>
        </div>
      )}
    </div>
  );
};

export default CategoryHeaderSection;
