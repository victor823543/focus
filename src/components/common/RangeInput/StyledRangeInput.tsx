import { useState } from "react";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";
import styles from "./StyledRangeInput.module.css"; // Import the CSS module

type RangeInputProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  min: number;
  max: number;
  step?: number;
  color?: string;
};

const StyledRangeInput = <TFieldValues extends FieldValues>({
  name,
  form,
  min,
  max,
  step = 1,
  color = "var(--text-primary-soft)",
}: RangeInputProps<TFieldValues>) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [currentValue, setCurrentValue] = useState(min);

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, ref, value = min },
        fieldState: { error },
      }) => (
        <div className={styles.rangeField}>
          <div
            className={styles.rangeWrapper}
            style={{ "--field-color": color } as React.CSSProperties}
          >
            <input
              type="range"
              name={name}
              id={name}
              ref={ref}
              value={value}
              min={min}
              max={max}
              step={step}
              onChange={(e) => {
                const newValue = Number(e.target.value);
                onChange(newValue);
                setCurrentValue(newValue);
              }}
              onFocus={() => setInputFocus(true)}
              onBlur={() => {
                onBlur();
                setInputFocus(false);
              }}
              className={styles.rangeInput}
            />
            {/* Number that hovers above the dot */}
            <div
              className={`${styles.rangeValue} ${inputFocus ? styles.active : ""}`}
              style={{ left: `${((currentValue - min) / (max - min)) * 100}%` }} // Dynamically position based on value
            >
              {currentValue}
            </div>
          </div>
          {error && (
            <div className={styles.error}>
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

type StyledRangeInputNoForm = {
  min: number;
  max: number;
  step?: number;
  color?: string;
  startValue?: number;
  onDragEnd: (value: number) => void;
};

export const StyledRangeInputNoForm: React.FC<StyledRangeInputNoForm> = ({
  min,
  max,
  step = 1,
  color = "var(--text-primary-soft)",
  startValue,
  onDragEnd,
}) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [value, setValue] = useState(startValue || min);

  const handleDragEnd = () => {
    onDragEnd(value);
    setInputFocus(false);
  };

  return (
    <div className={styles.rangeField}>
      <div
        className={styles.rangeWrapper}
        style={{ "--field-color": color } as React.CSSProperties}
      >
        <input
          type="range"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            setValue(Number(e.target.value));
          }}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          onFocus={() => setInputFocus(true)}
          className={styles.rangeInput}
        />
        {/* Number that hovers above the dot */}
        <div
          className={`${styles.rangeValue} ${inputFocus ? styles.active : ""}`}
          style={{ left: `${((value - min) / (max - min)) * 100}%` }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export default StyledRangeInput;
