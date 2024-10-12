import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import * as yup from "yup";
import ConfigurationLayout from "../components/configuration/ConfigurationLayout/ConfigurationLayout";
import CategoriesStep from "../components/configuration/steps/CategoriesStep/CategoriesStep";
import WelcomeStep from "../components/configuration/steps/WelcomeStep/WelcomeStep";
import useConfigureCategories from "../hooks/useConfigureCategories";
import useCreateSession from "../hooks/useCreateSession";
import useSelectSession from "../hooks/useSelectSession";
import { CreateSessionResponse, ListSessionsResponse } from "../types/Session";
import { callAPI } from "../utils/apiService";

const configureSessionSchema = yup.object().shape({
  title: yup.string().max(15, "Cannot exceed 15 characters").required(),
  categories: yup.array().of(yup.string().required()),
  start: yup.string().required(),
  end: yup.string(),
  activeDays: yup.array().of(yup.number().required()),
});

export type ConfigureFormFields = yup.InferType<typeof configureSessionSchema>;
export type ValidatedSteps = Record<number, boolean>;

const Configuration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { currentConfigCategories } = useConfigureCategories();
  const createSession = useCreateSession();
  const { selectSession, currentSession } = useSelectSession();
  const [validatedSteps, setValidatedSteps] = useState<ValidatedSteps>({
    0: false,
    1: false,
    2: false,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => callAPI<ListSessionsResponse>("/sessions", "GET"),
  });

  const form = useForm<ConfigureFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(configureSessionSchema),
  });

  const configureMutation = useMutation({
    mutationFn: (params: ConfigureFormFields) =>
      callAPI<CreateSessionResponse>(
        `/sessions/create/${currentSession?.id}`,
        "POST",
        params,
      ),
    onSuccess: (response) => {
      selectSession(response);
    },
  });

  const titleValue = form.watch("title");
  const categoriesValue = form.watch("categories");

  // Function to check if the field is valid and update state
  const isFieldValid = async (order: number, fieldName: string, value: any) => {
    try {
      await configureSessionSchema.validateAt(fieldName, {
        [fieldName]: value,
      });
      setValidatedSteps((prev) => ({ ...prev, [order]: true })); // Field is valid
    } catch (error) {
      setValidatedSteps((prev) => ({ ...prev, [order]: false })); // Field is invalid
    }
  };

  // UseEffect to watch fields and validate them as they change
  useEffect(() => {
    if (titleValue !== undefined) {
      isFieldValid(0, "title", titleValue);
    }
  }, [titleValue]);

  useEffect(() => {
    if (currentConfigCategories && currentConfigCategories.length > 0) {
      setValidatedSteps((prev) => ({ ...prev, 1: true }));
    } else {
      setValidatedSteps((prev) => ({ ...prev, 1: false }));
    }
  }, [currentConfigCategories]);

  useEffect(() => {
    if (categoriesValue !== undefined) {
      isFieldValid(2, "categories", categoriesValue);
    }
  }, [categoriesValue]);

  const handleSubmit = (params: ConfigureFormFields) => {
    configureMutation.mutate(params);
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <ConfigurationLayout
      step={currentStep}
      prevStep={() => setCurrentStep((prev) => prev - 1)}
      nextStep={handleNext}
      validatedSteps={validatedSteps}
    >
      <form onSubmit={form.handleSubmit(handleSubmit)}></form>
      <Steps step={currentStep} form={form} />
    </ConfigurationLayout>
  );
};

type StepsProps = {
  step: number;
  form: UseFormReturn<ConfigureFormFields>;
};

const Steps: React.FC<StepsProps> = ({ step, form }) => {
  switch (step) {
    case 0: {
      return <WelcomeStep form={form} />;
    }
    case 1: {
      return <CategoriesStep />;
    }
    default:
      return <div>something went wrong</div>;
  }
};

export default Configuration;
