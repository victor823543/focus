import { GoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../provider/authProvider";
import { callAPI } from "../../../utils/apiService";

const GoogleLoginButton: React.FC = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (googleToken: string) =>
      callAPI<{ token: string }>("/auth/google-login", "POST", {
        token: googleToken,
      }),
    onSuccess: (response) => {
      setToken(response.token);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleGoogleLoginSuccess = (response: any) => {
    const googleToken = response.credential;
    mutation.mutate(googleToken);
    navigate("/dashboard");
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLoginSuccess}
      onError={() => console.log("Login Failed")}
    />
  );
};

export default GoogleLoginButton;
