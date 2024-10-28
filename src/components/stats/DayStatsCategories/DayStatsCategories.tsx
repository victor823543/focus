import React from "react";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../types/Category";
import { CategoryScore } from "../../../types/Day";
import { DayComparisonInfo, DayRelevant } from "../../../types/Stats";
import { to1Dec } from "../../../utils/functions";
import styles from "./DayStatsCategories.module.css";

type DayStatsCategoriesProps = {
  day: DayRelevant;
  dayComparisonInfo: DayComparisonInfo;
};

const DayStatsCategories: React.FC<DayStatsCategoriesProps> = ({
  day,
  dayComparisonInfo,
}) => {
  return (
    <div className={styles.categoriesSection}>
      <h3 className={styles.h2}>Categories</h3>
      <div className={styles.categoriesGrid}>
        {day.score.map((categoryScore) => {
          const category = day.categories.find(
            (category) => category.id === categoryScore.category,
          );
          if (category === undefined) {
            return null;
          }
          return (
            <CategoryDisplay
              key={category.id}
              category={category}
              categoryScore={categoryScore}
            />
          );
        })}
      </div>
    </div>
  );
};

const CategoryDisplay: React.FC<{
  category: Category;
  categoryScore: CategoryScore;
}> = ({ category, categoryScore }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/categories/${category.id}`)}
      className={styles.categoryContainer}
      style={
        {
          "--hex": category.color.main,
          "--hex-light": category.color.light,
          "--hex-dark": category.color.dark,
        } as React.CSSProperties
      }
    >
      <div className={styles.infoContainer}>
        <div className={styles.infoBox}>{category.name}</div>
        <div className={styles.bar}></div>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.infoBox}>
          <span>Score:</span>
          <span>
            {to1Dec(categoryScore.calculatedScore)} / {category.importance * 10}
          </span>
        </div>
        <div className={styles.bar}>
          <div
            className={styles.barInner}
            style={{
              width: `${to1Dec((categoryScore.calculatedScore / (category.importance * 10)) * 100)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default DayStatsCategories;
