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
import RangeInput from "../../common/RangeInput/RangeInput";
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
      hex: yup
        .string()
        .matches(/^#([0-9A-F]{3}){1,2}$/i)
        .required(),
    })
    .required()
    .default({ name: "Gray", hex: "#9ca3af" }),
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
      color: { name: "Gray", hex: "#9ca3af" }, // Default color value
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
              <RangeInput
                form={form}
                name="importance"
                min={0.1}
                max={3}
                step={0.1}
              />
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
