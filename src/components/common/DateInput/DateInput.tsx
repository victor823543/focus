import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import { dateToInputFormat } from "../../../utils/functions";

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
