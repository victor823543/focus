import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.css";

export type BreadcrumbItem = {
  name: string | null | undefined;
  href: string;
};

type BreadcrumbsProps = {
  items: Array<BreadcrumbItem>;
};

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.ol}>
        <li className={styles.li}>
          <Link to="/dashboard" className={styles.homeLink}>
            <HomeIcon className={styles.icon} />
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className={styles.li}>
            <ChevronRightIcon className={`${styles.icon} ${styles.chevron}`} />
            <Link to={item.href} className={styles.link}>
              {item.name}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
