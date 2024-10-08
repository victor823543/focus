import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Modal, ModalWrapperBlur } from "../components/common/Modals/Modals";
import Layout from "../components/layout/Layout/Layout";
import SignupForm from "../components/signup/SignupForm/SignupForm";
import { useAuth } from "../provider/authProvider";
import { callAPI } from "../utils/apiService";

const signupSchema = yup.object().shape({
  email: yup.string().email().required("Email cannot be empty."),
  username: yup.string().required("Username cannot be empty."),
  password: yup
    .string()
    .min(5, "Must be at least 5 characters")
    .required("You must create a password."),
});

export type SignupFormFields = yup.InferType<typeof signupSchema>;

type SignupResponse = {
  token: string;
};

const Signup = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  const form = useForm<SignupFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(signupSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ username, email, password }: SignupFormFields) =>
      callAPI<SignupResponse>("/users/signup", "POST", {
        username,
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

  const handleSubmit = (data: SignupFormFields) => {
    mutation.mutate(data);
  };

  return (
    <Layout name="Dashboard">
      <ModalWrapperBlur>
        <Modal>
          <SignupForm form={form} handleSubmit={handleSubmit} />
        </Modal>
      </ModalWrapperBlur>
    </Layout>
  );
};

export default Signup;
