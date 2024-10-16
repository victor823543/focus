import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import useConfigureCategories from "../../../../hooks/useConfigureCategories";
import { Color, CreateCategoryParams } from "../../../../types/Category";
import { ConfigureFormFields } from "../../../../views/Configuration";
import { ColorPickerNoForm } from "../../../categories/ColorPicker/ColorPicker";
import { Container } from "../../../common/Containers/Containers";
import { Header } from "../../../common/Headers/Headers";
import { Paragraph } from "../../../common/Paragraphs/Paragraphs";
import { StyledRangeInputNoForm } from "../../../common/RangeInput/StyledRangeInput";
import styles from "./ImportanceStep.module.css";

type ImportanceStepProps = {
  form: UseFormReturn<ConfigureFormFields>;
};

const ImportanceStep: React.FC<ImportanceStepProps> = ({ form }) => {
  const [showColorPicker, setShowColorPicker] = useState<null | number>(null);
  const { currentConfigCategories, updateConfigCategory } =
    useConfigureCategories();

  useEffect(() => {
    form.setValue("categories", currentConfigCategories);
  }, [currentConfigCategories]);

  const updateColor = (color: Color, category: CreateCategoryParams) => {
    updateConfigCategory({ ...category, color });
  };

  const updateImportance = (
    importance: number,
    category: CreateCategoryParams,
  ) => {
    updateConfigCategory({ ...category, importance });
  };

  return (
    <Container className={styles.container} gap="lg">
      <Header variant="config" center>
        Configure importance
      </Header>
      <Paragraph className={styles.p}>
        Decide the importance of each category. Your score will be multiplied by
        the importance value.
      </Paragraph>
      <div className={styles.grid}>
        {currentConfigCategories.map((category, index) => {
          return (
            <div
              key={category.name}
              className={styles.formWrapper}
              style={
                {
                  "--category-color": category.color?.hex,
                } as React.CSSProperties
              }
            >
              <div className={styles.categoryContainer}>
                <div className={styles.category}>{category.name}</div>
                <div
                  className={styles.colorBox}
                  style={{ backgroundColor: category.color?.hex }}
                  onClick={() => setShowColorPicker(index)}
                ></div>
              </div>

              <StyledRangeInputNoForm
                min={1}
                max={3}
                step={0.1}
                onDragEnd={(value) => updateImportance(value, category)}
                startValue={category.importance}
              />

              {showColorPicker === index && (
                <div
                  className={styles.modalWrapper}
                  onClick={() => setShowColorPicker(null)}
                >
                  <div
                    className={styles.colorPickerModal}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ColorPickerNoForm
                      callback={(color) => {
                        {
                          updateColor(color, category),
                            setShowColorPicker(null);
                        }
                      }}
                      selected={category.color.name}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default ImportanceStep;
