import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { dateToInputFormat } from "../../../utils/functions";
import styles from "./DateInput.module.css";

type DateInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
};

const DateInput = <TFieldValues extends FieldValues>({
  name,
  form,
}: DateInputProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, ref, value, onBlur },
        fieldState: { error },
      }) => (
        <>
          <input
            className={styles.input}
            ref={ref}
            id={name}
            type="date"
            onBlur={onBlur}
            onChange={(e) => onChange(new Date(e.target.value).toISOString())}
            value={dateToInputFormat(value)}
          />
          {error?.message}
        </>
      )}
    />
  );
};

export default DateInput;
