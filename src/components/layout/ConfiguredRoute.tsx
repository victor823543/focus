import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useSelectSession from "../../hooks/useSelectSession";
import { useAuth } from "../../provider/authProvider";

export const ConfiguredRoute: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { currentSession } = useSelectSession();

  useEffect(() => {
    if (user === null) {
      navigate("/login", { replace: true });
    }
    if (currentSession === null) {
      navigate("/configuration");
    }
  }, [user, navigate]);

  return user && currentSession ? <Outlet /> : null;
};
