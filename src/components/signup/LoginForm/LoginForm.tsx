import { UseFormReturn } from "react-hook-form";
import { LoginFormFields } from "../../../views/Login";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Container } from "../../common/Containers/Containers";
import { Header } from "../../common/Headers/Headers";
import Label from "../../common/Label/Label";
import Link from "../../common/Link/Link";
import TextField from "../../common/TextField/TextField";

type LoginFormProps = {
  form: UseFormReturn<LoginFormFields>;
  handleSubmit: (data: LoginFormFields) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ form, handleSubmit }) => {
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Container gap="lg" paddingX="xl">
        <Header as="h2" variant="secondary">
          Log in to your account
        </Header>
        <Container>
          <Container flex="end" gap="md">
            <Label htmlFor="email">Email</Label>
            <TextField
              form={form}
              name="email"
              placeholder="Enter your email address"
            />
          </Container>
          <Container flex="end" gap="md">
            <Label htmlFor="password">Password</Label>
            <TextField
              form={form}
              name="password"
              placeholder="Choose a strong password"
              type="password"
              autoComplete="new-password"
            />
          </Container>
        </Container>
        <CustomizableButton variant="primary" type="submit">
          Submit
        </CustomizableButton>
        <Link to={"/signup"}>
          Don't have an account? Signup <span>here.</span>
        </Link>
      </Container>
    </form>
  );
};

export default LoginForm;
