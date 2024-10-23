import { PlusIcon } from "@heroicons/react/24/outline";
import React, { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useHandleSearchParam } from "../../../hooks/useHandleSearchParam";
import { Category } from "../../../types/Category";
import { formatUnixDate } from "../../../utils/formatUnixDate";
import { Paragraph } from "../../common/Paragraphs/Paragraphs";
import styles from "./UserCategories.module.css";

type UserCategoriesProps = {
  categories: Array<Category>;
};

const UserCategories: React.FC<UserCategoriesProps> = ({ categories }) => {
  const { addParam } = useHandleSearchParam("create");
  const navigate = useNavigate();
  return (
    <div>
      <h1 className={styles.h1}>Your Categories</h1>
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
            onClick={() => navigate(`/categories/${category.id}`)}
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
    </div>
  );
};

export default UserCategories;
