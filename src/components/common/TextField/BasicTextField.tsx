import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import styles from "./BasicTextField.module.css";

type BasicTextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  type?: "text" | "password";
  autoComplete?: "off" | "new-password" | "current-password";
  form: UseFormReturn<TFieldValues>;
  color?: string;
  className?: string;
  placeholder?: string;
  onChangeCallback?: () => void;
  dataCy?: string;
};

const BasicTextField = <TFieldValues extends FieldValues>({
  name,
  type = "text",
  autoComplete = "off",
  form,
  color = "var(--text-primary-soft)",
  className = "",
  placeholder = "",
  onChangeCallback,
  dataCy,
}: BasicTextFieldProps<TFieldValues>) => {
  const [inputFocus, setInputFocus] = useState(false);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, ref, value = "" },
        fieldState: { error },
      }) => (
        <div>
          <input
            style={{ "--field-color": color } as React.CSSProperties}
            type={type}
            name={name}
            id={name}
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChange={(e) => {
              onChange(e.target.value),
                onChangeCallback ? onChangeCallback() : undefined;
            }}
            onFocus={() => setInputFocus(true)}
            onBlur={() => {
              onBlur();
              setInputFocus(false);
            }}
            autoCapitalize="off"
            autoComplete={autoComplete}
            spellCheck="false"
            autoCorrect="off"
            className={`${styles.input} ${className}`}
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
        </div>
      )}
    />
  );
};

export default BasicTextField;
