import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import styles from "./RangeInput.module.css";

type RangeInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  min: number;
  max: number;
  step: number;
  initialValue?: number;
};

const RangeInput = <TFieldValues extends FieldValues>({
  name,
  form,
  initialValue = 1,
  ...rest
}: RangeInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, ref, value = initialValue },
        fieldState: { error },
      }) => (
        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            ref={ref}
            id={name}
            type="range"
            onChange={(e) => onChange(Number(e.target.value))}
            value={value}
            {...rest}
          />
          <p className={styles.p}>{value}</p>
        </div>
      )}
    />
  );
};

export default RangeInput;
