import { PlusIcon } from "@heroicons/react/24/outline";
import React, { CSSProperties } from "react";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import { Category } from "../../../types/Category";
import { formatUnixDate } from "../../../utils/formatUnixDate";
import { Container } from "../../common/Containers/Containers";
import { Header } from "../../common/Headers/Headers";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import styles from "./UserCategories.module.css";

type UserCategoriesProps = {
  categories: Array<Category>;
};

const UserCategories: React.FC<UserCategoriesProps> = ({ categories }) => {
  const { addParam } = useHandleSearchParam("create");
  return (
    <Container gap="xl">
      <Header as="h2" variant="secondary" style={{ marginBottom: ".5rem" }}>
        Your Categories
      </Header>
      <div className={styles.wrapper}>
        <div
          className={`${styles.categoryDisplay} ${styles.addNew}`}
          onClick={addParam}
        >
          <div className={styles.iconWrapper}>
            <PlusIcon strokeWidth={2} />
            <Paragraph variant="bold">Add New</Paragraph>
          </div>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.categoryDisplay}
            style={{ "--hex": category.color.hex } as CSSProperties}
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
    </Container>
  );
};

export default UserCategories;
