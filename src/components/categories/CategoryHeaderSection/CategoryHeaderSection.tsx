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
      <div className={styles.infoBox}>
        <strong className={styles.strong}>Importance:</strong>
        <span>{importance}</span>
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
