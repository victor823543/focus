import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import useSelectSession from "../../../hooks/useSelectSession";
import { callAPI } from "../../../utils/apiService";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Container } from "../../common/Containers/Containers";
import { Header } from "../../common/Headers/Headers";
import Label from "../../common/Label/Label";
import { Modal, ModalWrapperBlur } from "../../common/Modals/Modals";
import { StyledRange } from "../../common/RangeInput/StyledRangeInput";
import TextField from "../../common/TextField/TextField";
import ColorPicker from "../ColorPicker/ColorPicker";

const createCategorySchema = yup.object().shape({
  name: yup
    .string()
    .max(10, "Maximum 10 characters")
    .required("You must name your category."),
  importance: yup.number().required().default(1),
  session: yup.string().required(),
  color: yup
    .object({
      name: yup.string().required(),
      main: yup
        .string()
        .matches(/^#([0-9A-F]{3}){1,2}$/i)
        .required(),
      light: yup
        .string()
        .matches(/^#([0-9A-F]{3}){1,2}$/i)
        .required(),
      dark: yup
        .string()
        .matches(/^#([0-9A-F]{3}){1,2}$/i)
        .required(),
    })
    .required()
    .default({
      name: "Gray",
      main: "#9ca3af",
      light: "#e5e7eb",
      dark: "#374151",
    }),
});

export type CategoryFormFields = yup.InferType<typeof createCategorySchema>;

const CreateCategory = () => {
  const { removeParam } = useHandleSearchParam("create");
  const { currentSession } = useSelectSession();

  const queryClient = useQueryClient();

  const form = useForm<CategoryFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(createCategorySchema),
    defaultValues: {
      name: "",
      importance: 1,
      session: currentSession ? currentSession.id : "", // Set session initially if available
      color: {
        name: "Gray",
        main: "#9ca3af",
        light: "#e5e7eb",
        dark: "#374151",
      }, // Default color value
    },
  });

  // Reset the form when currentSession changes
  useEffect(() => {
    if (currentSession) {
      form.reset({
        ...form.getValues(), // Keep existing values for other fields
        session: currentSession.id, // Update session field
      });
    }
  }, [currentSession, form]);

  const createMutation = useMutation({
    mutationFn: (params: CategoryFormFields) =>
      callAPI("/categories/create", "POST", params),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["categories", currentSession?.id],
      });
      removeParam();
    },
  });

  const handleSubmit = (params: CategoryFormFields) => {
    createMutation.mutate(params);
  };

  return (
    <ModalWrapperBlur onClick={removeParam}>
      <Modal>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Container gap="xl">
            <Header as="h2" variant="secondary">
              New Category
            </Header>
            <Container gap="lg">
              <Label htmlFor="name">Name</Label>
              <TextField form={form} name="name" placeholder="Choose a name" />
            </Container>
            <Container gap="lg">
              <Label htmlFor="importance">Importance</Label>
              <div style={{ width: "20rem" }}>
                <StyledRange
                  form={form}
                  name="importance"
                  startValue={form.getValues("importance")}
                  min={1}
                  max={3}
                  step={0.1}
                  fieldColor="var(--gray-light-tr)"
                  fillColor="var(--primary-color)"
                  showValue="right-side"
                  height="2.5rem"
                  phoneHeight="3.5rem"
                  color="var(--primary-color-dark)"
                />
              </div>
            </Container>
            <Container gap="lg">
              <Label>Color</Label>
              <ColorPicker form={form} name="color" />
            </Container>
            <CustomizableButton size="lg" type="submit" variant="primary">
              Create
            </CustomizableButton>
          </Container>
        </form>
      </Modal>
    </ModalWrapperBlur>
  );
};

export default CreateCategory;
