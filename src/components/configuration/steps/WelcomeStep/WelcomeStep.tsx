import { UseFormReturn } from "react-hook-form";
import { ConfigureFormFields } from "../../../../views/Configuration";
import { Container } from "../../../common/Containers/Containers";
import { Header } from "../../../common/Headers/Headers";
import { Paragraph } from "../../../common/Paragraphs/Paragraphs";
import TextField from "../../../common/TextField/TextField";
import styles from "./WelcomeStep.module.css";

type WelcomeStepProps = {
  form: UseFormReturn<ConfigureFormFields>;
};

const WelcomeStep: React.FC<WelcomeStepProps> = ({ form }) => {
  return (
    <Container className={styles.container} gap="lg">
      <Header variant="config" center>
        Let's create your first session
      </Header>
      <Paragraph>Choose a title for your session</Paragraph>
      <Container flex="start">
        <TextField
          form={form}
          name="title"
          placeholder="Session title"
          type="text"
          color="var(--gray-light)"
        />
      </Container>
    </Container>
  );
};

export default WelcomeStep;
