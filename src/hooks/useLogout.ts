import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearSessionState } from "../features/session/sessionSlice";
import { useAuth } from "../provider/authProvider";

const useLogout = () => {
  const dispatch = useDispatch();
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setToken(null);
    localStorage.clear();
    dispatch(clearSessionState());
    navigate("/");
  };

  return logout;
};

export default useLogout;
