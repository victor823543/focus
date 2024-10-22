import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import classNames from "classnames";
import { SVGProps, useEffect } from "react";
import { Link } from "react-router-dom";
import { Alert, AlertLink, AlertType } from "../../../hooks/useAlerts";
import styles from "./Alerts.module.css";

type AlertProps = {
  message: string;
  link?: AlertLink;
  closeable: boolean;
  onClose?: () => void;
  onDurationEnd?: () => void;
};

type AlertStylingProps = {
  variant: AlertType;
  duration?: number;
  Icon: React.FC<SVGProps<SVGElement>>;
};

const createAlertComponent = ({
  variant,
  duration,
  Icon,
}: AlertStylingProps) => {
  return ({ message, link, closeable, onClose, onDurationEnd }: AlertProps) => {
    useEffect(() => {
      if (duration) {
        const timer = setTimeout(() => {
          if (onDurationEnd !== undefined) {
            onDurationEnd();
          }
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration]);
    return (
      <div className={`${styles.alert} ${styles[variant]}`}>
        <div className={styles.iconWrapper}>
          <Icon className={styles.icon} />
        </div>
        <div className={styles.text}>
          <span>{message}</span>
          {link && (
            <Link to={link.to} className={styles.link}>
              {link.title}
            </Link>
          )}
        </div>
        {closeable && (
          <button
            className={styles.close}
            onClick={() => {
              onClose && onClose();
            }}
          >
            <XMarkIcon className={styles.closeIcon} />
          </button>
        )}
      </div>
    );
  };
};

const WarningAlert = createAlertComponent({
  variant: AlertType.Warning,
  Icon: ExclamationTriangleIcon as React.FC<SVGProps<SVGElement>>,
});

const ErrorAlert = createAlertComponent({
  variant: AlertType.Error,
  Icon: ExclamationTriangleIcon as React.FC<SVGProps<SVGElement>>,
});

const SuccessAlert = createAlertComponent({
  variant: AlertType.Success,
  duration: 5,
  Icon: CheckCircleIcon as React.FC<SVGProps<SVGElement>>,
});

type AlertsProps = {
  list: Array<Alert>;
  hasSidebar?: boolean;
  onClose?: (item: Alert) => void;
  onDurationEnd?: (item: Alert) => void;
};

const Alerts: React.FC<AlertsProps> = ({
  list,
  hasSidebar = true,
  onClose,
  onDurationEnd,
}) => {
  return (
    <div
      className={classNames(
        styles.container,
        { [styles.hasSidebar]: hasSidebar },
        { [styles.noSidebar]: !hasSidebar },
      )}
    >
      <div className={styles.alertList}>
        {list
          .filter((item) => item.type === AlertType.Error)
          .map((item) => (
            <ErrorAlert
              key={item.id}
              message={item.message}
              link={item.link}
              closeable={item.closeable}
              onClose={() => onClose?.(item)}
              onDurationEnd={() => onDurationEnd?.(item)}
            />
          ))}
        {list
          .filter((item) => item.type === AlertType.Warning)
          .map((item) => (
            <WarningAlert
              key={item.id}
              message={item.message}
              link={item.link}
              closeable={item.closeable}
              onClose={() => onClose?.(item)}
            />
          ))}
        {list
          .filter((item) => item.type === AlertType.Success)
          .map((item) => (
            <SuccessAlert
              key={item.id}
              message={item.message}
              link={item.link}
              closeable={item.closeable}
              onClose={() => onClose?.(item)}
              onDurationEnd={() => onDurationEnd?.(item)}
            />
          ))}
      </div>
    </div>
  );
};

export default Alerts;
