import { UseFormReturn } from "react-hook-form";
import { ConfigureFormFields } from "../../../../views/Configuration";
import CalendarDateInput from "../../../common/CalendarDateInput/CalendarDateInput";
import { Container } from "../../../common/Containers/Containers";
import { Header } from "../../../common/Headers/Headers";
import { Paragraph } from "../../../common/Paragraphs/Paragraphs";
import styles from "./DateStep.module.css";

type DateStepProps = {
  form: UseFormReturn<ConfigureFormFields>;
};

const DateStep: React.FC<DateStepProps> = ({ form }) => {
  return (
    <Container className={styles.container} gap="lg">
      <Header variant="config" center className={styles.header}>
        Decide When to Start
      </Header>
      <Paragraph className={styles.p}>
        Pick a startdate for your session, or leave blank to start today. You
        can optionally pick an end date if you want the session to be confined
        to a specific period. You can always change it later.
      </Paragraph>
      <div className={styles.grid}>
        <Container className={styles.calendarContainer}>
          <Header
            variant="secondary"
            style={{ color: "var(--gray-light)", fontSize: "1.6rem" }}
          >
            Start
          </Header>
          <CalendarDateInput form={form} name="start" />
        </Container>
        <Container className={styles.calendarContainer}>
          <Header
            variant="secondary"
            style={{ color: "var(--gray-light)", fontSize: "1.6rem" }}
          >
            End
          </Header>
          <CalendarDateInput form={form} name="end" />
        </Container>
      </div>
    </Container>
  );
};

export default DateStep;
