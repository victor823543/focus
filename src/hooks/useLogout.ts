import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCategoryState } from "../features/configuration/configurationSlice";
import { clearDayState } from "../features/day/daySlice";
import { clearSessionState } from "../features/session/sessionSlice";
import { useAuth } from "../provider/authProvider";

const useLogout = () => {
  const dispatch = useDispatch();
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logout = () => {
    dispatch(clearSessionState());
    dispatch(clearCategoryState());
    dispatch(clearDayState());
    queryClient.clear();
    setToken(null);
    navigate("/");
  };

  return logout;
};

export default useLogout;
