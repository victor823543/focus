import { useNavigate } from "react-router-dom";
import { useCalendar } from "../../../hooks/useCalendar";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import { formatDate } from "../../../utils/functions";
import styles from "./NoStatsSection.module.css";

const NoStatsSection = () => {
  const { currentValue } = useHandleSearchParam("date");
  const { goToDate } = useCalendar();
  const navigate = useNavigate();
  return (
    <div>
      <h2 className={styles.h2}>
        {formatDate(new Date(currentValue ? currentValue : ""), "medium")}
      </h2>
      <div className={styles.noStatsBox}>
        <p className={styles.p}>
          No statistics available for this day. <br /> Please select another
          day.
        </p>
        <a
          className={styles.a}
          onClick={() => {
            goToDate(new Date(currentValue ? currentValue : ""));
            navigate("/calendar?tab=day");
          }}
        >
          Enter data for this day
        </a>
      </div>
    </div>
  );
};

export default NoStatsSection;
