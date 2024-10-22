import { useQuery } from "@tanstack/react-query";
import {
  ReactElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useSelectSession from "../hooks/useSelectSession";
import { ListSessionsResponse } from "../types/Session";
import { User } from "../types/User";
import { callAPI } from "../utils/apiService";

type AuthContextProps = {
  token: string | null;
  user: User | null | undefined;
  userStatus: UserStatus;
  setToken: (newToken: string | null) => void;
  setStatus: (newStatus: UserStatus) => void;
  signNewToken: () => Promise<void>;
  reloadUserStatus: () => Promise<void>;
} | null;

type AuthProviderProps = {
  children: ReactElement;
};

export enum UserStatus {
  Unauthenticated = "Unauthenticated",
  Loading = "Loading",
  Authenticated = "Authenticated",
  Configured = "Configured",
}

type TokenResponse = {
  token: string;
};

const AuthContext = createContext<AuthContextProps>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { selectSession, selectSessions, currentSession } = useSelectSession();
  const [token, _setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [userStatus, setUserStatus] = useState<UserStatus>(UserStatus.Loading);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("token");
      setUser(null);
      return;
    }

    localStorage.setItem("token", token);

    setUserStatus(UserStatus.Loading);

    callAPI<User>("/users/validate-token", "POST")
      .then((response) => {
        setUser(response);
        setUserStatus(UserStatus.Authenticated);
      })
      .catch(() => {
        setUser(null);
        setUserStatus(UserStatus.Unauthenticated);
      });
  }, [token]);

  // Centralized token setter with localStorage handling
  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    _setToken(newToken);
    setUser(undefined); // Reset user until token validation happens
  };

  // Function to sign a new token
  const signNewToken = async () => {
    try {
      const response = await callAPI<TokenResponse>(
        "/users/sign-new-token",
        "POST",
      );
      setToken(response.token);
    } catch {
      setUser(null);
      setUserStatus(UserStatus.Unauthenticated);
    }
  };

  // Query to fetch user sessions
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["sessions"],
    enabled: !!token,
    queryFn: () => callAPI<ListSessionsResponse>("/sessions", "GET"),
  });

  // Effect to handle session selection based on fetched data
  useEffect(() => {
    if (isLoading) {
      setUserStatus(UserStatus.Loading);
    }

    if (data && data.length > 0) {
      setUserStatus(UserStatus.Configured);
      if (!currentSession) {
        selectSession(data[0]); // Automatically select the first session if none is selected
      }
      selectSessions(data);
    }

    if ((!data || data.length === 0) && user) {
      setUserStatus(UserStatus.Authenticated);
    }
  }, [data, isLoading, currentSession, user]);

  // Function to refetch sessions and update status with promise
  const reloadUserStatus = () => {
    setUserStatus(UserStatus.Loading);

    return new Promise<void>((resolve, reject) => {
      refetch()
        .then((result) => {
          if (result.data && result.data.length > 0) {
            setUserStatus(UserStatus.Configured);
          } else {
            setUserStatus(UserStatus.Authenticated);
          }
          resolve();
        })
        .catch((error) => {
          setUserStatus(UserStatus.Unauthenticated);
          reject(error);
        });
    });
  };

  const contextValue = useMemo(
    () => ({
      token,
      user,
      userStatus,
      setToken,
      setStatus: setUserStatus,
      reloadUserStatus,
      signNewToken,
    }),
    [token, user, signNewToken],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Something went wrong...");
  }

  return context;
};

export default AuthProvider;
