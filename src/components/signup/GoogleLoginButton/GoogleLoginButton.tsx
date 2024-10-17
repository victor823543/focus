import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../../assets/svgs/google-icon.svg";
import { useAuth } from "../../../provider/authProvider";
import { callAPI } from "../../../utils/apiService";
import styles from "./GoogleLoginButton.module.css";

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
      navigate("/dashboard");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleGoogleLoginSuccess = (response: any) => {
    const googleToken = response.access_token;
    mutation.mutate(googleToken);
  };

  const login = useGoogleLogin({
    onSuccess: handleGoogleLoginSuccess,
    onError: () => console.log("Login Failed"),
  });

  return (
    <button
      className={styles.btn}
      onClick={(e) => {
        e.preventDefault(), login();
      }}
    >
      <div className={styles.icon}>
        <img src={googleIcon} alt="google logo" />
        {/* <GoogleSvg color="white" /> */}
      </div>
      Continue with Google
    </button>
  );
};

export default GoogleLoginButton;
