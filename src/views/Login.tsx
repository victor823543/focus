import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Alerts from "../components/common/Alerts/Alerts";
import LoginForm from "../components/signup/LoginForm/LoginForm";
import SignupLayout from "../components/signup/SignupLayout/SignupLayout";
import { ErrorAlert, useAlerts } from "../hooks/useAlerts";
import { useAuth } from "../provider/authProvider";
import { ErrorCode } from "../types/StatusCode";
import { callAPI, ControlledError } from "../utils/apiService";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email cannot be empty."),
  password: yup.string().required("You must enter a password."),
});

export type LoginFormFields = yup.InferType<typeof loginSchema>;

type LoginResponse = {
  token: string;
};

const Login = () => {
  const { setToken, reloadUserStatus, userStatus } = useAuth();
  const navigate = useNavigate();
  const { alerts, pushAlert, removeAlert } = useAlerts();

  const form = useForm<LoginFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const mutation = useMutation({
    mutationFn: ({ email, password }: LoginFormFields) =>
      callAPI<LoginResponse>("/users/login", "POST", {
        email,
        password,
      }),
    onSuccess: async (response) => {
      setToken(response.token);
      await reloadUserStatus();
      if (userStatus === "Configured") navigate("/dashboard");
      else navigate("/configuration");
    },
    onError: (err: Error) => {
      if (err instanceof ControlledError) {
        if (
          err.status === ErrorCode.NO_RESULT ||
          err.status === ErrorCode.BAD_REQUEST
        ) {
          pushAlert(new ErrorAlert(err.message));
        } else {
          pushAlert(new ErrorAlert("An error occurred. Please try again."));
          console.log(err);
        }
      } else {
        pushAlert(new ErrorAlert("An error occurred. Please try again."));
        console.log(err);
      }
    },
  });

  const handleSubmit = (data: LoginFormFields) => {
    mutation.mutate(data);
  };

  return (
    <SignupLayout>
      <LoginForm form={form} handleSubmit={handleSubmit} />
      <Alerts
        list={alerts}
        onClose={(item) => removeAlert(item)}
        onDurationEnd={(item) => removeAlert(item)}
        hasSidebar={false}
      />
    </SignupLayout>
  );
};

export default Login;
