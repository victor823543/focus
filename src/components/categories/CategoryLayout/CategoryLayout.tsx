import React from "react";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../common/Breadcrumbs/Breadcrumbs";
import styles from "./CategoryLayout.module.css";

type CategoryLayoutProps = {
  breadcrumbs: BreadcrumbItem[];
  sections: React.ReactNode[];
} & React.HTMLAttributes<HTMLDivElement>;

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  breadcrumbs,
  sections,
  ...rest
}) => {
  return (
    <div className={styles.layout} {...rest}>
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
