import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useConfigureCategories from "../../../../hooks/useConfigureCategories";
import { Category, CreateCategoryParams } from "../../../../types/Category";
import { callAPI } from "../../../../utils/apiService";
import ColorPicker from "../../../categories/ColorPicker/ColorPicker";
import CustomizableButton from "../../../common/Buttons/CustomizableButton";
import { Container } from "../../../common/Containers/Containers";
import { Header } from "../../../common/Headers/Headers";
import { Paragraph } from "../../../common/Paragraphs/Paragraphs";
import Spinner from "../../../common/Spinner/Spinner";
import TextField from "../../../common/TextField/TextField";
import styles from "./CategoriesStep.module.css";

const createCategorySchema = yup.object().shape({
  name: yup
    .string()
    .max(10, "Maximum 10 characters")
    .required("You must name your category."),
  importance: yup.number().min(1).max(3).required().default(1),
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
      light: "#d1d5db",
      dark: "#6b7280",
    }),
});

const defaultValues = {
  color: {
    name: "Gray",
    main: "#9ca3af",
    light: "#d1d5db",
    dark: "#6b7280",
  },
  importance: 1,
};

type CategoryFormFields = yup.InferType<typeof createCategorySchema>;

const CategoriesStep = () => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const {
    customConfigCategories,
    currentConfigCategories,
    addConfigCategory,
    addCustomConfigCategory,
    removeConfigCategory,
  } = useConfigureCategories();
  const { data, isLoading, error } = useQuery({
    queryKey: ["globalCategories"],
    queryFn: () => callAPI<Array<Category>>("/categories/global", "GET"),
  });

  const form = useForm<CategoryFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(createCategorySchema),
    defaultValues: defaultValues,
  });

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Spinner />;

  const categories: Array<CreateCategoryParams> = [
    ...data.map((category) => ({
      name: category.name,
      color: category.color,
      importance: category.importance,
    })),
    ...customConfigCategories,
  ];

  return (
    <Container className={styles.container} gap="lg">
      <Header data-cy="categories-title" variant="config" center>
        Now choose your categories
      </Header>
      <Paragraph className={styles.p}>
        Choose which categories on which you want to stay focused.
      </Paragraph>
      <div className={styles.grid}>
        {categories.map((category) => {
          const selected = !!currentConfigCategories.find(
            (cat) => cat.name === category.name,
          );

          return (
            <div
              key={category.name}
              className={`${styles.category} ${selected ? styles.selected : ""}`}
              style={
                {
                  "--category-color": category.color?.main,
                } as React.CSSProperties
              }
              onClick={
                selected
                  ? () => removeConfigCategory(category)
                  : () => addConfigCategory(category)
              }
              data-cy={`category-${category.name}`}
              data-testid="category"
            >
              {category.name}
            </div>
          );
        })}
      </div>
      <Paragraph>Or add your own.</Paragraph>
      <Container gap="lg" className={styles.addContainer}>
        <div className={styles.addCategory}>
          <TextField
            form={form}
            name="name"
            placeholder="Choose a name"
            color="var(--gray-light)"
          />
          <div
            className={styles.colorBox}
            style={{ backgroundColor: form.watch("color.main") }}
            onClick={() => setShowColorPicker((prev) => !prev)}
            data-testid="color-box"
          ></div>
          {showColorPicker && (
            <div
              className={styles.modalWrapper}
              onClick={() => setShowColorPicker(false)}
              data-testid="modal-wrapper"
            >
              <div
                className={styles.colorPickerModal}
                onClick={(e) => e.stopPropagation()}
              >
                <ColorPicker
                  callback={() => setShowColorPicker(false)}
                  name="color"
                  form={form}
                />
              </div>
            </div>
          )}
        </div>
        <CustomizableButton
          onClick={form.handleSubmit((params) => {
            addCustomConfigCategory(params), form.reset(defaultValues);
          })}
          size="sm"
          variant="primary"
        >
          Add Category
        </CustomizableButton>
      </Container>
      <div className={styles.phoneDivider}></div>
    </Container>
  );
};

export default CategoriesStep;
