import { useQuery } from "@tanstack/react-query";
import { CSSProperties } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Color } from "../../../types/Category";
import { callAPI } from "../../../utils/apiService";
import Loading from "../../common/Loading/Loading";
import styles from "./ColorPicker.module.css";

type ColorPickerProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  callback?: (color: Color) => void;
};

const ColorPicker = <TFieldValues extends FieldValues>({
  name,
  form,
  callback,
}: ColorPickerProps<TFieldValues>) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["colors"],
    queryFn: () => callAPI<Array<Color>>("/colors", "GET"),
  });

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <Controller
      control={form.control}
      name={name}
      render={({
        field: { value = { name: "Gray", hex: "#9ca3af" }, onChange },
      }) => (
        <div className={styles.colorPicker}>
          {data.map((color) => (
            <div
              key={color.name}
              style={{ "--hex": color.hex } as CSSProperties}
              className={`${styles.colorItem} ${value.name === color.name ? styles.selected : ""}`}
              onClick={() => {
                onChange(color), callback ? callback(color) : undefined;
              }}
            >
              {color.name}
            </div>
          ))}
        </div>
      )}
    />
  );
};

type ColorPickerNoFormProps = {
  callback: (color: Color) => void;
  selected?: string;
};

export const ColorPickerNoForm: React.FC<ColorPickerNoFormProps> = ({
  callback,
  selected,
}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["colors"],
    queryFn: () => callAPI<Array<Color>>("/colors", "GET"),
  });

  if (error !== null) return <span>Something went wrong</span>;
  if (isLoading || data === undefined) return <Loading />;

  return (
    <div className={styles.colorPicker}>
      {data.map((color) => (
        <div
          key={color.name}
          style={{ "--hex": color.hex } as CSSProperties}
          className={`${styles.colorItem} ${selected === color.name ? styles.selected : ""}`}
          onClick={() => {
            callback(color);
          }}
        >
          {color.name}
        </div>
      ))}
    </div>
  );
};

export default ColorPicker;
