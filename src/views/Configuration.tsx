import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import ConfigurationLayout from "../components/configuration/ConfigurationLayout/ConfigurationLayout";
import CategoriesStep from "../components/configuration/steps/CategoriesStep/CategoriesStep";
import DateStep from "../components/configuration/steps/DateStep/DateStep";
import ImportanceStep from "../components/configuration/steps/ImportanceStep/ImportanceStep";
import WelcomeStep from "../components/configuration/steps/WelcomeStep/WelcomeStep";
import useConfigureCategories from "../hooks/useConfigureCategories";
import useSelectSession from "../hooks/useSelectSession";
import { CreateSessionResponse, ListSessionsResponse } from "../types/Session";
import { callAPI } from "../utils/apiService";

const categorySchema = yup.object({
  name: yup.string().required(),
  importance: yup.number().required().default(1),
  color: yup
    .object({
      name: yup.string().required(),
      hex: yup
        .string()
        .matches(/^#([0-9A-F]{3}){1,2}$/i)
        .required(),
    })
    .required(),
});

const configureSessionSchema = yup.object().shape({
  title: yup.string().max(15, "Cannot exceed 15 characters").required(),
  categories: yup.array().of(categorySchema).required(),
  start: yup
    .string()
    .required()
    .test(
      "valid-date",
      "Start date must be a valid date",
      (value) => !isNaN(Date.parse(value)),
    ),
  end: yup
    .string()
    .nullable()
    .test(
      "end-date-after-start",
      "End date must be later than the start date",
      function (value) {
        const { start } = this.parent; // Access start date
        if (!value) return true; // Allow end date to be null
        return new Date(value) > new Date(start); // Ensure end > start
      },
    )
    .test(
      "valid-date",
      "End date must be a valid date",
      (value) => !value || !isNaN(Date.parse(value)),
    ),
});

export type ConfigureFormFields = yup.InferType<typeof configureSessionSchema>;
export type ValidatedSteps = Record<number, boolean>;

const Configuration = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const { currentConfigCategories } = useConfigureCategories();
  const { selectSession, currentSession } = useSelectSession();
  const [validatedSteps, setValidatedSteps] = useState<ValidatedSteps>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["sessions"],
    queryFn: () => callAPI<ListSessionsResponse>("/sessions", "GET"),
  });

  useEffect(() => {
    if (currentSession !== null) {
      navigate("/dashboard");
    }
    if (data && data.length > 0) {
      selectSession(data[data.length - 1]);
      navigate("/dashboard");
    }
  }, [data, currentSession]);

  const form = useForm<ConfigureFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(configureSessionSchema),
    defaultValues: {
      start: Date(),
    },
  });

  const configureMutation = useMutation({
    mutationFn: (params: ConfigureFormFields) =>
      callAPI<CreateSessionResponse>(`/sessions/configure`, "POST", params),
    onSuccess: (response) => {
      selectSession(response);
      navigate("/dashboard");
    },
    onError: (error) => console.log(error),
  });

  //   Field Validation

  const titleValue = form.watch("title");
  const categoriesValue = form.watch("categories");
  const startValue = form.watch("start");
  const endValue = form.watch("end");

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

  // For multiple fields
  const isFieldsValid = async (
    order: number,
    fieldNames: string[],
    values: any[],
    currentValues: any,
  ) => {
    try {
      const updatedValues = { ...currentValues };

      fieldNames.forEach((fieldName, index) => {
        updatedValues[fieldName] = values[index];
      });

      await configureSessionSchema.validate(updatedValues, {
        abortEarly: false,
      });

      setValidatedSteps((prev) => ({ ...prev, [order]: true }));
    } catch (error) {
      setValidatedSteps((prev) => ({ ...prev, [order]: false }));
    }
  };

  // UseEffect's to watch fields and validate them as they change
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

  useEffect(() => {
    if (startValue) {
      isFieldsValid(
        3,
        ["start", "end"],
        [startValue, endValue],
        form.getValues(),
      );
    }
  }, [endValue, startValue]);

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <ConfigurationLayout
        step={currentStep}
        prevStep={() => setCurrentStep((prev) => prev - 1)}
        nextStep={handleNext}
        validatedSteps={validatedSteps}
      >
        <Steps step={currentStep} form={form} />
      </ConfigurationLayout>
    </form>
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
    case 2: {
      return <ImportanceStep form={form} />;
    }
    case 3: {
      return <DateStep form={form} />;
    }
    default:
      return <div>something went wrong</div>;
  }
};

export default Configuration;
