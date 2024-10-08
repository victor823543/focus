import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomizableButton from "../components/common/Buttons/CustomizableButton";
import { Container } from "../components/common/Containers/Containers";
import DateInput from "../components/common/DateInput/DateInput";
import { Header } from "../components/common/Headers/Headers";
import Loading from "../components/common/Loading/Loading";
import { Paragraph } from "../components/common/Paragraphs/Paragraphs";
import TextField from "../components/common/TextField/TextField";
import Layout from "../components/layout/Layout/Layout";
import CategorySelection from "../components/settings/CategorySelection/CategorySelection";
import useSelectSession from "../hooks/useSelectSession";
import { Session, UpdateSessionResponse } from "../types/Session";
import { callAPI } from "../utils/apiService";

const configureSessionSchema = yup.object().shape({
  title: yup.string(),
  categories: yup.array().of(yup.string().required()),
  start: yup.string(),
  end: yup.string(),
  activeDays: yup.array().of(yup.number().required()),
});

export type ConfigureFormFields = yup.InferType<typeof configureSessionSchema>;

const Settings = () => {
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
    <Layout name="Settings">
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Container>
          <Header variant="secondary">Configure your session</Header>
          <Container flex="start">
            <Paragraph>Session title</Paragraph>
            <TextField
              form={form}
              name="title"
              placeholder="Update Title"
              type="text"
            />
          </Container>

          <Container direction="row" gap="lg">
            <Container>
              <Paragraph>Start Date</Paragraph>
              <DateInput form={form} name="start" />
            </Container>
            <Container>
              <Paragraph>End Date (Optional)</Paragraph>
              <DateInput form={form} name="end" />
            </Container>
          </Container>

          <Container>
            <Paragraph>Selected Categories</Paragraph>
            <CategorySelection form={form} name="categories" />
          </Container>

          <CustomizableButton type="submit">Update Session</CustomizableButton>
        </Container>
      </form>
    </Layout>
  );
};

export default Settings;
