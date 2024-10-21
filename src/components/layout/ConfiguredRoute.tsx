import { Outlet } from "react-router-dom";
import useCheckSession from "../../hooks/useCheckSession";
import Loading from "../common/Loading/Loading";

const ConfiguredRoute: React.FC = () => {
  const { isLoading, user, currentSession } = useCheckSession();

  if (isLoading || !user || !currentSession) {
    return <Loading />;
  }

  return <Outlet />;
};

export default ConfiguredRoute;
