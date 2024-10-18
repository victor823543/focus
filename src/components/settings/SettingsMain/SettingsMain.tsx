import React, { useEffect } from "react";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import LineTabs from "../../common/LineTabs/LineTabs";
import styles from "./SettingsMain.module.css";

const tabs = [
  { label: "Account Settings", id: "account" },
  { label: "Session Settings", id: "session" },
];

type SettingsMainProps = {
  accountSettings: React.ReactNode;
  sessionSettings: React.ReactNode;
};

const SettingsMain: React.FC<SettingsMainProps> = ({
  accountSettings,
  sessionSettings,
}) => {
  const { addParam, currentValue, setParam } = useHandleSearchParam(
    "tab",
    "account",
  );

  useEffect(() => addParam, []);

  return (
    <main className={styles.main}>
      <LineTabs
        tabs={tabs}
        selected={currentValue || "account"}
        setSelected={(tab) => setParam(tab)}
      />
      <div className={styles.viewWrapper}>
        {currentValue === "account" && accountSettings}
        {currentValue === "session" && sessionSettings}
      </div>
    </main>
  );
};

export default SettingsMain;
