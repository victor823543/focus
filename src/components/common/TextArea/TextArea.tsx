import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import styles from "./TextArea.module.css";

type TextAreaProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  color?: string;
  bg?: string;
  className?: string;
  placeholder?: string;
  onChangeCallback?: () => void;
  dataCy?: string;
};

const TextArea = <TFieldValues extends FieldValues>({
  name,
  form,
  color = "var(--text-primary)",
  bg = "transparent",
  className = "",
  placeholder = "",
  onChangeCallback,
  dataCy,
}: TextAreaProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, ref, value = "" },
        fieldState: { error },
      }) => (
        <>
          <textarea
            style={
              { "--area-color": color, "--area-bg": bg } as React.CSSProperties
            }
            name={name}
            id={name}
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              onChange(e.target.value),
                onChangeCallback ? onChangeCallback() : undefined;
            }}
            onBlur={() => {
              onBlur();
            }}
            autoCapitalize="off"
            spellCheck="false"
            autoCorrect="off"
            className={`${styles.area} ${className}`}
            data-cy={dataCy}
          />
          {error && (
            <div className={styles.error}>
              <ExclamationTriangleIcon
                className={styles.errorIcon}
                aria-hidden="true"
              />
              <span className={styles.errorText}>
                {error.message?.toString()}
              </span>
            </div>
          )}
        </>
      )}
    />
  );
};

export default TextArea;
