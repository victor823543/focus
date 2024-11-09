import { useAuth } from "../../../provider/authProvider";
import styles from "./DashboardLayout.module.css";

type DashboardLayoutProps = {
  calendar: React.ReactNode;
  statsTop: React.ReactNode;
  statsBottom: React.ReactNode;
  categories: React.ReactNode;
  comparison: React.ReactNode;
  weeklyTarget: React.ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  statsTop,
  statsBottom,
  categories,
  comparison,
  calendar,
  weeklyTarget,
}) => {
  const { user } = useAuth();
  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.titleContainer}>
        <h1 className={styles.h1}>Welcome {user?.username}!</h1>
      </div>
      <div className={styles.grid}>
        <div className={`${styles.box} ${styles.calendar}`}>{calendar}</div>
        <div className={`${styles.box} ${styles.statsTop}`}>{statsTop}</div>
        <div className={`${styles.box} ${styles.statsBottom}`}>
          {statsBottom}
        </div>
        <div className={`${styles.box} ${styles.comparison}`}>{comparison}</div>
        <div className={`${styles.box} ${styles.weeklyTarget}`}>
          {weeklyTarget}{" "}
        </div>
        <div className={`${styles.box} ${styles.categories}`}>{categories}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
