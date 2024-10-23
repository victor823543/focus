import { UseFormReturn } from "react-hook-form";
import { LoginFormFields } from "../../../views/Login";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Container } from "../../common/Containers/Containers";
import { Header } from "../../common/Headers/Headers";
import Label from "../../common/Label/Label";
import Link from "../../common/Link/Link";
import TextField from "../../common/TextField/TextField";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

type LoginFormProps = {
  form: UseFormReturn<LoginFormFields>;
  handleSubmit: (data: LoginFormFields) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, handleSubmit }) => {
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Container gap="lg">
        <Header as="h2" variant="secondary">
          Log in to your account
        </Header>
        <Container paddingX="none">
          <Container flex="end" gap="md" paddingX="none">
            <Label htmlFor="email">Email</Label>
            <TextField
              form={form}
              name="email"
              placeholder="Enter your email address"
              dataCy="email"
            />
          </Container>
          <Container flex="end" gap="md" paddingX="none">
            <Label htmlFor="password">Password</Label>
            <TextField
              form={form}
              name="password"
              placeholder="Choose a strong password"
              type="password"
              autoComplete="current-password"
              dataCy="password"
            />
          </Container>
        </Container>
        <CustomizableButton
          variant="wide"
          size="lg"
          type="submit"
          style={{ fontSize: "1rem" }}
          data-cy="submit"
        >
          Submit
        </CustomizableButton>
        <GoogleLoginButton />
        <Link to={"/signup"} data-cy="link-signup">
          Don't have an account? Signup <span>here.</span>
        </Link>
      </Container>
    </form>
  );
};

export default LoginForm;
