import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { clearSessionState } from "../../../features/session/sessionSlice";
import { Alert, SuccessAlert } from "../../../hooks/useAlerts";
import useSelectSession from "../../../hooks/useSelectSession";
import { Session, UpdateSessionResponse } from "../../../types/Session";
import { callAPI } from "../../../utils/apiService";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Container } from "../../common/Containers/Containers";
import DateInput from "../../common/DateInput/DateInput";
import { Header } from "../../common/Headers/Headers";
import Loading from "../../common/Loading/Loading";
import { ModalWrapper, WarningModal } from "../../common/Modals/Modals";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import BasicTextField from "../../common/TextField/BasicTextField";
import CategorySelection from "../CategorySelection/CategorySelection";
import SettingsField, {
  SettingsContainer,
} from "../SettingsField/SettingsField";
import styles from "./SessionSettings.module.css";

const configureSessionSchema = yup.object().shape({
  title: yup.string(),
  categories: yup.array().of(yup.string().required()),
  start: yup.string(),
  end: yup.string(),
  activeDays: yup.array().of(yup.number().required()),
});

export type ConfigureFormFields = yup.InferType<typeof configureSessionSchema>;

type SessionSettingsProps = {
  pushAlert: (item: Alert) => void;
};

const SessionSettings: React.FC<SessionSettingsProps> = ({ pushAlert }) => {
  const { selectSession, currentSession, sessions } = useSelectSession();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, error } = useQuery({
    enabled: !!currentSession,
    queryKey: ["session", currentSession?.id],
    queryFn: () => callAPI<Session>(`/sessions/${currentSession?.id}`, "GET"),
  });

  const form = useForm<ConfigureFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(configureSessionSchema),
  });

  useEffect(() => {
    if (data) {
      form.reset({
        title: data.title,
        categories: data.categories.map((category) => category.id),
        start: data.start,
        end: data.end || undefined,
        activeDays: data.activeDays,
      });
    }
  }, [data]);

  const configureMutation = useMutation({
    mutationFn: (params: ConfigureFormFields) =>
      callAPI<UpdateSessionResponse>(
        `/sessions/update/${currentSession?.id}`,
        "PUT",
        params,
      ),
    onSuccess: (response) => {
      selectSession(response);
      pushAlert(new SuccessAlert("Session updated", { duration: 4 }));
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => callAPI(`/sessions/${currentSession?.id}`, "DELETE"),
    onSuccess: () => {
      console.log("Session deleted");
      console.log(sessions.length);
      if (sessions.length > 1) {
        // Find the first session that is not the current session
        const newSession = sessions.find(
          (session) => session.id !== currentSession?.id,
        );
        if (newSession) {
          selectSession(newSession);
        }
        queryClient.clear();
        navigate(`/dashboard`);
      } else {
        queryClient.clear();
        dispatch(clearSessionState());
        navigate(`/configuration`);
      }
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  const handleSubmit = (params: ConfigureFormFields) => {
    configureMutation.mutate(params);
  };

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading layoutName="Settings" />;

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <SettingsContainer>
        <SettingsField
          title="Session"
          description="Edit your Session settings"
        />
        <SettingsField title="Session Title">
          <label className={styles.label} htmlFor="title">
            Session Title
          </label>
          <BasicTextField
            key="title"
            form={form}
            name="title"
            type="text"
            placeholder="Title"
          />
        </SettingsField>
        <SettingsField
          title="Start Date"
          description="Change the start date of your session."
        >
          <div className={styles.dateWrapper} data-cy="start-field">
            <label className={styles.label} htmlFor="start">
              Start Date
            </label>
            <DateInput form={form} name="start" key="start" />
          </div>
        </SettingsField>
        <SettingsField
          title="End Date (optional)"
          description="Change the end date of your session."
        >
          <div className={styles.dateWrapper} data-cy="end-field">
            <label className={styles.label} htmlFor="end">
              End Date
            </label>
            <DateInput form={form} name="end" key="end" />
          </div>
        </SettingsField>
        <SettingsField title="Categories" description="Edit your Categories">
          <CategorySelection form={form} name="categories" />
        </SettingsField>
        <SettingsField>
          <CustomizableButton type="submit" variant="primary" data-cy="update">
            Update Session
          </CustomizableButton>
        </SettingsField>
        <SettingsField
          title="Delete Session"
          description="Permanently delete your account and all its data"
        >
          <div>
            <CustomizableButton
              onClick={() => setShowDeleteModal(true)}
              type="button"
              variant="warning"
              data-cy="delete-session"
            >
              Delete Session
            </CustomizableButton>
          </div>
        </SettingsField>
      </SettingsContainer>
      {showDeleteModal && (
        <ModalWrapper onClick={() => setShowDeleteModal(false)}>
          <WarningModal>
            <Container gap="lg" style={{ maxWidth: "30rem" }}>
              <Header
                variant="secondary"
                style={{ color: "var(--gray-x-dark)" }}
              >
                Delete your Session?
              </Header>
              <Paragraph>
                Deleting a session is irreversible and you will lose all it's
                data.
              </Paragraph>
              <div className={styles.btnContainer}>
                <CustomizableButton
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  data-cy="cancel-delete"
                >
                  Cancel
                </CustomizableButton>
                <CustomizableButton
                  onClick={() => deleteMutation.mutate()}
                  type="button"
                  variant="strong-warning"
                  data-testid="confirm-delete"
                  data-cy="confirm-delete"
                >
                  Delete
                </CustomizableButton>
              </div>
            </Container>
          </WarningModal>
        </ModalWrapper>
      )}
    </form>
  );
};

export default SessionSettings;
