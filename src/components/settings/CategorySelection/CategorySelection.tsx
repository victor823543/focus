import { PlusIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import { CSSProperties, useMemo, useState } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import useSelectSession from "../../../hooks/useSelectSession";
import { Category } from "../../../types/Category";
import { callAPI } from "../../../utils/apiService";
import { formatUnixDate } from "../../../utils/formatUnixDate";
import CustomizableButton from "../../common/Buttons/CustomizableButton";
import { Container } from "../../common/Containers/Containers";
import { Header } from "../../common/Headers/Headers";
import Loading from "../../common/Loading/Loading";
import { Modal, ModalWrapperBlur } from "../../common/Modals/Modals";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import { ConfigureFormFields } from "../SessionSettings/SessionSettings";
import styles from "./CategorySelection.module.css";

type CategorySelectionProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
};

const CategorySelection = ({
  name,
  form,
}: CategorySelectionProps<ConfigureFormFields>) => {
  const { hasParam, addParam, removeParam } = useHandleSearchParam("selecting");
  const { currentSession } = useSelectSession();
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", currentSession?.id],
    queryFn: () =>
      callAPI<Array<Category>>(`/categories/list/${currentSession?.id}`, "GET"),
  });

  const handleFinishedSelecting = (ids: string[]) => {
    removeParam();
    form.setValue("categories", ids);
  };

  const selectedCategories: Array<Category> = useMemo(() => {
    const selectedIds: string[] | undefined = form.getValues("categories");
    if (selectedIds && selectedIds.length > 0 && data) {
      return [...data].filter((category) => selectedIds.includes(category.id));
    } else return [];
  }, [form.register("categories"), data]);

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <div className={styles.categorySelection}>
      <div className={styles.selectedScroller}>
        {selectedCategories.map((category) => (
          <div
            key={category.id}
            style={{ "--hex": category.color.hex } as CSSProperties}
            className={styles.categoryBox}
          >
            {category.name}
          </div>
        ))}
      </div>

      <CustomizableButton type="button" onClick={addParam} variant="opaque">
        Select categories
      </CustomizableButton>

      {hasParam && (
        <CategorySelectionModal
          categories={data}
          handleFinishedSelecting={handleFinishedSelecting}
          selectedIds={selectedCategories.map((category) => category.id)}
        />
      )}
    </div>
  );
};

type CategorySelectionModalProps = {
  categories: Category[];
  handleFinishedSelecting: (ids: string[]) => void;
  selectedIds: string[];
};

const CategorySelectionModal: React.FC<CategorySelectionModalProps> = ({
  categories,
  handleFinishedSelecting,
  selectedIds,
}) => {
  const [selected, setSelected] = useState<string[]>(selectedIds);

  const handleCategoryClick = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        return [...prev].filter((listedId) => listedId !== id);
      } else return [...prev, id];
    });
  };
  return (
    <ModalWrapperBlur onClick={() => handleFinishedSelecting(selected)}>
      <Modal>
        <Container gap="xl">
          <Header as="h2" variant="secondary" style={{ marginBottom: ".5rem" }}>
            Select Categories
          </Header>
          <div className={styles.wrapper}>
            <div className={`${styles.categoryDisplay} ${styles.addNew}`}>
              <div className={styles.iconWrapper}>
                <PlusIcon strokeWidth={2} />
                <Paragraph variant="bold">Add New</Paragraph>
              </div>
            </div>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryDisplay} ${selected.includes(category.id) ? styles.selected : ""}`}
                style={{ "--hex": category.color.hex } as CSSProperties}
                onClick={() => handleCategoryClick(category.id)}
              >
                <Paragraph variant="bold">{category.name}</Paragraph>
                <Paragraph variant="secondary">
                  Importance <br /> {category.importance}
                </Paragraph>
                <Paragraph variant="secondary">
                  Created <br /> {formatUnixDate(category.timestamp)}
                </Paragraph>
                <div className={styles.colorBar}></div>
              </div>
            ))}
          </div>
          <CustomizableButton
            variant="primary"
            onClick={() => handleFinishedSelecting(selected)}
          >
            Done
          </CustomizableButton>
        </Container>
      </Modal>
    </ModalWrapperBlur>
  );
};

export default CategorySelection;
