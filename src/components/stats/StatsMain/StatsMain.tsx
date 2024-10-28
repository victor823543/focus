import { Link } from "react-router-dom";
import styles from "./StatsMain.module.css";

const StatsMain = () => {
  return (
    <main>
      <h1 className={styles.h1}>Stats</h1>
      <div className={styles.optionsContainer}>
        <Link to="/stats/day" className={`${styles.option} ${styles.day}`}>
          <span>
            Day <br /> Statistics
          </span>
        </Link>
        <Link to="#" className={`${styles.option} ${styles.week}`}>
          <span>
            Week <br /> Statistics
          </span>
          <div className={styles.comingSoon}>Coming Soon</div>
        </Link>
        <Link to="#" className={`${styles.option} ${styles.month}`}>
          <span>
            Month <br /> Statistics
          </span>
          <div className={styles.comingSoon}>Coming Soon</div>
        </Link>
      </div>
    </main>
  );
};

export default StatsMain;
