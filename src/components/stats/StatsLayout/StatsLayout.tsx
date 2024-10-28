import React from "react";
import Breadcrumbs, {
  BreadcrumbItem,
} from "../../common/Breadcrumbs/Breadcrumbs";
import styles from "./StatsLayout.module.css";

type StatsLayoutProps = {
  breadcrumbs: BreadcrumbItem[];
  sections: React.ReactNode[];
} & React.HTMLAttributes<HTMLDivElement>;

const StatsLayout: React.FC<StatsLayoutProps> = ({
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

export default StatsLayout;
