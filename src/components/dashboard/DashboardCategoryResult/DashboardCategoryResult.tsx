import React from "react";
import { useNavigate } from "react-router-dom";
import useSelectSession from "../../../hooks/useSelectSession";
import { WeekCategoryData } from "../../../types/Dashboard";
import { to1Dec } from "../../../utils/functions";
import Loading from "../../common/Loading/Loading";
import styles from "./DashboardCategoryResult.module.css";

type DashboardCategoryResultProps = {
  categoryData: WeekCategoryData;
};

const DashboardCategoryResult: React.FC<DashboardCategoryResultProps> = ({
  categoryData,
}) => {
  const { currentSession } = useSelectSession();
  const navigate = useNavigate();

  if (currentSession === null) return <Loading />;

  const categories = currentSession.categories;
  return (
    <div className={styles.container}>
      <h2 className={styles.h2}>Category Score This Week</h2>
      <div className={styles.categoryList}>
        {Object.entries(categoryData).map(([id, score]) => {
          const categoryInfo = categories.find((cat) => cat.id === id);
          return (
            <div
              key={id}
              className={styles.infoContainer}
              onClick={() => navigate(`/categories/${id}`)}
              style={
                {
                  "--hex": categoryInfo?.color.main,
                  "--hex-light": categoryInfo?.color.light,
                } as React.CSSProperties
              }
            >
              <div className={styles.infoBox}>
                <span>{categoryInfo?.name}:</span>
                <span>
                  {to1Dec(score.totalScore)} / {to1Dec(score.maxScore)}
                </span>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.barInner}
                  style={{
                    width: `${to1Dec(score.totalScore / score.maxScore) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardCategoryResult;
