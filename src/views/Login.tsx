import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Modal, ModalWrapperBlur } from "../components/common/Modals/Modals";
import Layout from "../components/layout/Layout/Layout";
import LoginForm from "../components/signup/LoginForm/LoginForm";
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
    <Layout name="Dashboard">
      <ModalWrapperBlur>
        <Modal>
          <LoginForm form={form} handleSubmit={handleSubmit} />
        </Modal>
      </ModalWrapperBlur>
    </Layout>
  );
};

export default Login;
