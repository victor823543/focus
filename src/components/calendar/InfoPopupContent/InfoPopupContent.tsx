import {
  ClockIcon,
  DocumentCheckIcon,
  ExclamationCircleIcon,
  LockClosedIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { DayStatus } from "../../../types/Day";
import { SelectedInfo } from "../CalendarMonthView/CalendarMonthView";
import styles from "./InfoPopupContent.module.css";

type InfoPopupContentProps = {
  info: SelectedInfo;
};

const InfoPopupContent: React.FC<InfoPopupContentProps> = ({ info }) => {
  const renderContent = (): React.ReactNode => {
    switch (info.status) {
      case DayStatus.MissingResult:
        return (
          <>
            <PopupMarker
              variant="missing"
              title="Missing data"
              text="Enter result"
              href="calendar?tab=day"
              icon={<ExclamationCircleIcon />}
            />
          </>
        );
      case DayStatus.WaitingResult:
        return (
          <>
            <PopupMarker
              variant="waiting"
              title="Waiting for today's data"
              text="Enter result"
              href="calendar?tab=day"
              icon={<PencilSquareIcon />}
            />
          </>
        );
      case DayStatus.HasResult:
        return (
          <>
            <PopupMarker
              variant="result"
              title={`Score: ${info.score?.totalScore} / ${info.score?.maxScore}`}
              text={`${info.score?.percentageScore}%`}
              icon={<DocumentCheckIcon />}
            />
          </>
        );
      case DayStatus.Before:
        return (
          <>
            <PopupMarker
              variant="outside"
              title={`Outside of session`}
              icon={<LockClosedIcon />}
            />
          </>
        );
      case DayStatus.After:
        return (
          <>
            <PopupMarker
              variant="outside"
              title={`Future date`}
              icon={<ClockIcon />}
            />
          </>
        );
    }
  };

  return (
    <div className={styles.popupContent}>
      <h2 className={styles.date}>{info.formattedDate}</h2>
      <div className={styles.markersWrapper}>{renderContent()}</div>
    </div>
  );
};

type PopupMarkerProps = {
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
};

const variantStyles: Record<
  PopupMarkerProps["variant"],
  { color: string; backgroundColor: string }
> = {
  achievement: {
    color: "var(--purple-dark)",
    backgroundColor: "var(--purple-2x-light)",
  },
  result: {
    color: "var(--green-dark)",
    backgroundColor: "var(--green-2x-light)",
  },
  start: { color: "var(--amber)", backgroundColor: "var(--amber-2x-light)" },
  missing: { color: "var(--red)", backgroundColor: "var(--red-2x-light)" },
  waiting: { color: "var(--blue)", backgroundColor: "var(--blue-2x-light)" },
  outside: { color: "var(--gray)", backgroundColor: "var(--gray-x-light)" },
};

const PopupMarker: React.FC<PopupMarkerProps> = ({
  variant,
  icon,
  title,
  text = "",
  href,
}) => {
  const stylesForVariant = variantStyles[variant];

  return (
    <div
      style={stylesForVariant}
      className={`${styles.marker} ${styles[variant]}`}
    >
      {icon && <div className={styles.iconWrapper}>{icon}</div>}
      <h2 className={styles.markerTitle}>{title}</h2>
      {!href ? (
        <p className={styles.markerP}>{text}</p>
      ) : (
        <a className={styles.markerA} href={href}>
          {text}
        </a>
      )}
    </div>
  );
};

export default InfoPopupContent;
