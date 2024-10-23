import React from "react";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../common/Breadcrumbs/Breadcrumbs";
import styles from "./CategoryLayout.module.css";

type CategoryLayoutProps = {
  breadcrumbs: BreadcrumbItem[];
  sections: React.ReactNode[];
};

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  breadcrumbs,
  sections,
}) => {
  return (
    <div className={styles.layout}>
      <Breadcrumbs items={breadcrumbs} />
      <div className={styles.sectionsContainer}>
        {sections.map((section, index) => (
          <div key={index} className={styles.section}>
            {section}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLayout;
