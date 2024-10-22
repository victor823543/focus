import { useState } from "react";
import { useLocation } from "react-router-dom";

export type Alert = {
  id: string;
  type: AlertType;
  message: string;
  link?: AlertLink;
  closeable: boolean;
  duration?: number;
};

export type AlertLink = {
  title: string;
  to: string;
  reload?: boolean;
};

export enum AlertType {
  Warning = "warning",
  Error = "error",
  Success = "success",
}

export const useAlerts = (defaultAlert?: Alert) => {
  const { state } = useLocation();

  const defaults: Array<Alert> = defaultAlert ? [defaultAlert] : [];

  if (state && state.error) {
    defaults.push(state.error as Alert);
    window.history.replaceState({}, "");
  }

  const [alerts, setAlerts] = useState<Array<Alert>>(defaults);

  const pushAlert = (item: Alert) => {
    setAlerts((prev) => [...prev, item]);
  };

  const removeAlert = (item: Alert) => {
    setAlerts((prev) => prev.filter((warn) => warn !== item));
  };

  const clearAlerts = (type?: AlertType) => {
    if (type !== undefined) {
      return setAlerts((prev) => prev.filter((warn) => warn.type !== type));
    }

    setAlerts([]);
  };

  return {
    alerts,
    pushAlert,
    removeAlert,
    clearAlerts,
  };
};

class AlertBase {
  id: string;
  type: AlertType;
  message: string;
  link?: AlertLink;
  closeable: boolean;
  duration?: number;

  constructor(
    type: AlertType,
    message: string,
    link?: AlertLink,
    closeable: boolean = true,
    duration?: number,
  ) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.message = message;
    this.link = link;
    this.closeable = closeable;
    this.duration = duration;
  }
}

type OptionalAlertOptions = {
  link?: AlertLink;
  closeable?: boolean;
  duration?: number;
};

export class WarningAlert extends AlertBase {
  constructor(
    message: string,
    { link, closeable, duration }: OptionalAlertOptions = {},
  ) {
    super(AlertType.Warning, message, link, closeable, duration);
  }
}

export class ErrorAlert extends AlertBase {
  constructor(
    message: string,
    { link, closeable, duration }: OptionalAlertOptions = {},
  ) {
    super(AlertType.Error, message, link, closeable, duration);
  }
}

export class SuccessAlert extends AlertBase {
  constructor(
    message: string,
    { link, closeable, duration }: OptionalAlertOptions = {},
  ) {
    super(AlertType.Success, message, link, closeable, duration);
  }
}
