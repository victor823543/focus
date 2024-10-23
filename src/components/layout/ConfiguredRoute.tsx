import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth, UserStatus } from "../../provider/authProvider";
import Loading from "../common/Loading/Loading";

const ConfiguredRoute: React.FC = () => {
  const { userStatus } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userStatus === UserStatus.Unauthenticated) {
      navigate("/login");
    } else if (userStatus === UserStatus.Authenticated) {
      navigate("/configuration");
    }
  }, [userStatus, navigate]);

  if (userStatus === UserStatus.Loading) {
    return <Loading />;
  }

  return <Outlet />;
};

export default ConfiguredRoute;
