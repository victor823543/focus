import Layout from "../components/layout/Layout/Layout";
import AccountSettings from "../components/settings/AccountSettings/AccountSettings";
import SessionSettings from "../components/settings/SessionSettings/SessionSettings";
import SettingsMain from "../components/settings/SettingsMain/SettingsMain";

const Settings = () => {
  return (
    <Layout name="Settings">
      <SettingsMain
        accountSettings={<AccountSettings />}
        sessionSettings={<SessionSettings />}
      />
    </Layout>
  );
};

export default Settings;
