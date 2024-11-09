import classNames from "classnames";
import { motion } from "framer-motion";
import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import styles from "./TextField.module.css";

type TextFieldProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  placeholder: string;
};

const TextFieldUpdate = <TFieldValues extends FieldValues>({
  name,
  form,
  placeholder,
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
        <div className={styles.textField}>
          <div
            className={classNames(styles.placeholder, {
              [styles.focus]: inputFocus || value.length > 0,
            })}
          >
            <motion.span layout>{placeholder}</motion.span>
          </div>
          <input
            type="text"
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
            autoComplete="off"
            spellCheck="false"
            autoCorrect="off"
            className={styles.input}
          />
        </div>
      )}
    />
  );
};

export default TextFieldUpdate;
