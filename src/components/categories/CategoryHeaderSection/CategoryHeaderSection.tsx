import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SuccessAlert, useAlerts } from "../../../hooks/useAlerts";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import { Color } from "../../../types/Category";
import { callAPI } from "../../../utils/apiService";
import { formatDate } from "../../../utils/functions";
import Alerts from "../../common/Alerts/Alerts";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { ModalWrapperStrong } from "../../common/Modals/Modals";
import TextArea from "../../common/TextArea/TextArea";
import ColorPicker from "../ColorPicker/ColorPicker";
import styles from "./CategoryHeaderSection.module.css";

const categorySchema = yup.object({
  description: yup
    .string()
    .max(300, "Description should be max 300 characters")
    .optional(),
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
    .nullable(),
});

type CategoryFormFields = yup.InferType<typeof categorySchema>;

type CategoryHeaderSectionProps = {
  title: string;
  description?: string;
  importance: number;
  color: Color;
  createdAt: Date;
  id: string;
};

const CategoryHeaderSection: React.FC<CategoryHeaderSectionProps> = ({
  title,
  description,
  importance,
  color,
  createdAt,
  id,
}) => {
  const queryClient = useQueryClient();
  const { setParam, currentValue, removeParam } = useHandleSearchParam(
    "edit",
    "description",
  );

  const { alerts, pushAlert, removeAlert } = useAlerts();

  const form = useForm<CategoryFormFields>({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    resolver: yupResolver(categorySchema),
    defaultValues: {
      description: description || "",
      color: color,
    },
  });

  const categoryMutation = useMutation({
    mutationFn: (data: CategoryFormFields) =>
      callAPI(`/categories/update/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      pushAlert(new SuccessAlert("Category Updated", { duration: 4 }));
      removeParam();
    },
  });

  const handleSubmit = (data: CategoryFormFields) => {
    categoryMutation.mutate(data);
  };

  return (
    <div
      className={styles.container}
      style={
        { "--hex": color.main, "--hex-dark": color.dark } as React.CSSProperties
      }
    >
      <div className={styles.title}>
        <h1 className={styles.h1}>{title}</h1>
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.leftContainer}>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>
              <span>Importance:</span>
              <span>{importance}</span>
            </div>
            <div
              className={styles.bar}
              style={{ backgroundColor: color.light }}
            >
              <div
                style={{
                  width: `${(importance / 3) * 100}%`,
                  backgroundColor: color.main,
                }}
                className={styles.barInner}
              ></div>
            </div>
          </div>

          <div
            className={`${styles.infoContainer} ${styles.colorInfoContainer}`}
            onClick={() => setParam("color")}
          >
            <div className={styles.infoBox} style={{ width: "100%" }}>
              Color palette
            </div>
            <div className={styles.colorsContainer} data-testid="color-palette">
              <div
                className={styles.color}
                style={{ backgroundColor: color.light } as React.CSSProperties}
              ></div>
              <div
                className={styles.color}
                style={{ backgroundColor: color.main } as React.CSSProperties}
              ></div>
              <div
                className={styles.color}
                style={{ backgroundColor: color.dark } as React.CSSProperties}
              ></div>
            </div>
          </div>
          <div className={styles.infoContainer}>
            <div className={styles.infoBox}>
              <span>Created:</span>
              <span>{formatDate(createdAt, "medium")}</span>
            </div>
            <div
              className={styles.bar}
              style={{ backgroundColor: color.main }}
            ></div>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div
            className={`${styles.description} ${description ? "" : styles.empty}`}
            onClick={() => setParam("description")}
            data-testid="description"
          >
            {!description && <a>Click to add description</a>}
            {description && (
              <>
                <p>Category description:</p>
                <p className={styles.descriptionP}>
                  {description.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <Alerts
        list={alerts}
        onClose={(item) => removeAlert(item)}
        onDurationEnd={(item) => removeAlert(item)}
      />
      {currentValue === "description" && (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <ModalWrapperStrong
            onClick={() => removeParam()}
            data-testid="description-modal-wrapper"
          >
            <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
              <TextArea
                name="description"
                form={form}
                placeholder={placeholder}
                color="var(--gray-dark)"
                className={styles.textArea}
              />
              <CustomizableButton type="submit" className={styles.submit}>
                Save
              </CustomizableButton>
            </div>
          </ModalWrapperStrong>
        </form>
      )}
      {currentValue === "color" && (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <ModalWrapperStrong
            onClick={() => removeParam()}
            data-testid="color-modal-wrapper"
          >
            <div onClick={(e) => e.stopPropagation()} className={styles.modal}>
              <div className={styles.colorPickerWrapper}>
                <ColorPicker form={form} name="color" />
              </div>

              <CustomizableButton type="submit" className={styles.submit}>
                Save
              </CustomizableButton>
            </div>
          </ModalWrapperStrong>
        </form>
      )}
    </div>
  );
};

const placeholder =
  "Add a description \n \nExample: \nI should sleep for at least 8 hours a night and somewhere within the hours of 9pm and 6am.\n \n0: Slept for less than 4 hours. \n5: Slept for 6 hours and woke up 11am. \n10: Slept for 8 hours and woke up 6am.";

export default CategoryHeaderSection;
