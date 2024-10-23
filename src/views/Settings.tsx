import Alerts from "../components/common/Alerts/Alerts";
import Layout from "../components/layout/Layout/Layout";
import AccountSettings from "../components/settings/AccountSettings/AccountSettings";
import SessionSettings from "../components/settings/SessionSettings/SessionSettings";
import SettingsMain from "../components/settings/SettingsMain/SettingsMain";
import { useAlerts } from "../hooks/useAlerts";

const Settings = () => {
  const { alerts, pushAlert, removeAlert } = useAlerts();
  return (
    <Layout name="Settings">
      <SettingsMain
        accountSettings={<AccountSettings pushAlert={pushAlert} />}
        sessionSettings={<SessionSettings pushAlert={pushAlert} />}
      />
      <Alerts
        list={alerts}
        onClose={(item) => removeAlert(item)}
        onDurationEnd={(item) => removeAlert(item)}
      />
    </Layout>
  );
};

export default Settings;
