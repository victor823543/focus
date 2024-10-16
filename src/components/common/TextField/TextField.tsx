import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import styles from "./TextField.module.css";

type TextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  type?: "text" | "password";
  autoComplete?: "off" | "new-password" | "current-password";
  form: UseFormReturn<TFieldValues>;
  placeholder: string;
  color?: string;
};

const TextField = <TFieldValues extends FieldValues>({
  name,
  type = "text",
  autoComplete = "off",
  form,
  placeholder,
  color = "var(--text-primary-soft)",
}: TextFieldProps<TFieldValues>) => {
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
          <div
            className={styles.textField}
            style={{ "--field-color": color } as React.CSSProperties}
          >
            <div
              className={classNames(styles.placeholder, {
                [styles.focus]: inputFocus || value.length > 0,
              })}
            >
              <motion.span layout>{placeholder}</motion.span>
            </div>
            <input
              type={type}
              name={name}
              id={name}
              ref={ref}
              value={value}
              placeholder=""
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => {
                onBlur();
                setInputFocus(false);
              }}
              autoCapitalize="off"
              autoComplete={autoComplete}
              spellCheck="false"
              autoCorrect="off"
              className={styles.input}
            />
          </div>
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

export default TextField;
