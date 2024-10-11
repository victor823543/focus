import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import LoginForm from "../components/signup/LoginForm/LoginForm";
import SignupLayout from "../components/signup/SignupLayout/SignupLayout";
import { useAuth } from "../provider/authProvider";
import { callAPI } from "../utils/apiService";

const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email cannot be empty."),
  password: yup.string().required("You must create a password."),
});

export type LoginFormFields = yup.InferType<typeof loginSchema>;

type LoginResponse = {
  token: string;
};

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

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
    onSuccess: (response) => {
      setToken(response.token);
      navigate("/dashboard");
    },
    onError: (err: Error) => {
      console.log(err);
    },
  });

  const handleSubmit = (data: LoginFormFields) => {
    mutation.mutate(data);
  };

  return (
    <SignupLayout>
      <LoginForm form={form} handleSubmit={handleSubmit} />
    </SignupLayout>
  );
};

export default Login;
