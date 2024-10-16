import { UseFormReturn } from "react-hook-form";
import { SignupFormFields } from "../../../views/Signup";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Container } from "../../common/Containers/Containers";
import { Header } from "../../common/Headers/Headers";
import Label from "../../common/Label/Label";
import Link from "../../common/Link/Link";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import TextField from "../../common/TextField/TextField";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";

type SignupFormProps = {
  form: UseFormReturn<SignupFormFields>;
  handleSubmit: (data: SignupFormFields) => void;
};

const SignupForm: React.FC<SignupFormProps> = ({ form, handleSubmit }) => {
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <Container gap="lg" paddingX="sm">
        <Header as="h2" variant="secondary">
          Sign up
        </Header>
        <Paragraph variant="secondary">
          Create an account to get started
        </Paragraph>
        <Container paddingX="none">
          <Container flex="end" gap="md" paddingX="none">
            <Label htmlFor="username">Username</Label>
            <TextField
              form={form}
              name="username"
              placeholder="Choose a username"
            />
          </Container>
          <Container flex="end" gap="md" paddingX="none">
            <Label htmlFor="email">Email</Label>
            <TextField
              form={form}
              name="email"
              placeholder="Enter your email address"
            />
          </Container>
          <Container flex="end" gap="md" paddingX="none">
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
        <CustomizableButton variant="wide" size="lg" type="submit">
          Submit
        </CustomizableButton>
        <GoogleLoginButton />
        <Link to={"/login"}>
          Already have an account? Login <span>here.</span>
        </Link>
      </Container>
    </form>
  );
};

export default SignupForm;
