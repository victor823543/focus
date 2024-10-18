import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useSelectSession from "../../../hooks/useSelectSession";
import { Session, UpdateSessionResponse } from "../../../types/Session";
import { callAPI } from "../../../utils/apiService";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import DateInput from "../../common/DateInput/DateInput";
import Loading from "../../common/Loading/Loading";
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

const SessionSettings = () => {
  const { selectSession, currentSession } = useSelectSession();
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
    },
  });

  const handleSubmit = (params: ConfigureFormFields) => {
    configureMutation.mutate(params);
  };

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

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
          <BasicTextField key="title" form={form} name="title" type="text" />
        </SettingsField>
        <SettingsField
          title="Start Date"
          description="Change the start date of your session."
        >
          <div className={styles.dateWrapper}>
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
          <div className={styles.dateWrapper}>
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
          <CustomizableButton type="submit" variant="primary">
            Update Session
          </CustomizableButton>
        </SettingsField>
      </SettingsContainer>
    </form>
  );
};

export default SessionSettings;
