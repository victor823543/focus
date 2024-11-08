import { useNavigate } from "react-router-dom";
import { useCalendar } from "../../../hooks/useCalendar";
import { Day, DayStatus } from "../../../types/Day";
import { to1Dec } from "../../../utils/functions";
import styles from "./CalendarItems.module.css";

type CalendarItemsProps = {
  status: DayStatus;
  day: Day;
  date: Date;
};

const CalendarItems: React.FC<CalendarItemsProps> = ({ status, day, date }) => {
  const renderContent = (): React.ReactNode => {
    switch (status) {
      case DayStatus.MissingResult:
        return (
          <>
            <Item
              variant="missing"
              title="Missing data"
              text="Enter result"
              href="/calendar?tab=day"
              setDate={new Date(date)}
            />
          </>
        );
      case DayStatus.WaitingResult:
        return (
          <>
            <Item
              variant="waiting"
              title="Waiting for data"
              text="Enter result"
              href="/calendar?tab=day"
              setDate={new Date(date)}
            />
          </>
        );
      case DayStatus.HasResult:
        return (
          <>
            <Item
              variant="result"
              title={`Score: ${to1Dec(day.totalScore)}`}
              text={`View stats`}
              href={`/stats/day?date=${day.date}`}
            />
          </>
        );
      case DayStatus.Before:
        return (
          <>
            <Item variant="outside" title={`Outside of session`} />
          </>
        );
      case DayStatus.After:
        return (
          <>
            <Item variant="outside" title={`Future date`} />
          </>
        );
    }
  };

  return <>{renderContent()}</>;
};

type ItemProps = {
  variant:
    | "achievement"
    | "result"
    | "start"
    | "missing"
    | "waiting"
    | "outside";
  icon?: React.ReactNode;
  title: string;
  text?: string;
  href?: string;
  setDate?: Date;
};

const variantColors: Record<ItemProps["variant"], Record<string, string>> = {
  achievement: {
    "--hex": "var(--purple-dark)",
    "--hex-light": "var(--purple-2x-light)",
  },
  result: {
    "--hex": "var(--primary-color)",
    "--hex-light": "var(--green-2x-light)",
  },
  start: { "--hex": "var(--amber)", "--hex-light": "var(--amber-2x-light)" },
  missing: { "--hex": "var(--red)", "--hex-light": "var(--red-2x-light)" },
  waiting: { "--hex": "var(--blue)", "--hex-light": "var(--blue-2x-light)" },
  outside: { "--hex": "var(--gray)", "--hex-light": "var(--gray-x-light)" },
};

const Item: React.FC<ItemProps> = ({
  variant,
  icon,
  title,
  text = "",
  href,
  setDate,
}) => {
  const stylesForVariant = variantColors[variant];
  const navigate = useNavigate();
  const { goToDate } = useCalendar();
  return (
    <div
      style={stylesForVariant}
      className={`${styles.item} ${styles[variant]}`}
    >
      <div className={styles.leftBar}></div>

      <div className={styles.textContainer}>
        <h2 className={styles.markerTitle}>{title}</h2>
        {!href ? (
          <p className={styles.markerP}>{text}</p>
        ) : (
          <a
            className={styles.markerA}
            onClick={() => {
              if ((variant === "missing" || variant === "waiting") && setDate) {
                goToDate(setDate);
              }
              navigate(href);
            }}
          >
            {text}
          </a>
        )}
      </div>
    </div>
  );
};

export default CalendarItems;
