import React from "react";
import styles from "./Modals.module.css";

type ModalWrapperStylingProps = {
  /** Backdrop blur - any css measureunits - eg. (4px) */
  blur: string;
  /** Background opacity - fraction from 0 to 1 */
  darken: string;
};

const createModalWrapper =
  ({
    blur,
    darken,
  }: ModalWrapperStylingProps): React.FC<React.HTMLProps<HTMLDivElement>> =>
  ({ children, style, className, ...rest }) => {
    return (
      <div
        style={{
          ...style,
          backdropFilter: `blur(${blur})`,
          backgroundColor: `rgb(from var(--gray-2x-dark) r g b / ${darken})`,
        }}
        className={`${className} ${styles.modalWrapper}`}
        {...rest}
      >
        {children}
      </div>
    );
  };

export const ModalWrapper = createModalWrapper({
  darken: ".2",
  blur: "0",
});

export const ModalWrapperBlur = createModalWrapper({
  darken: ".1",
  blur: "4px",
});

interface ModalProps extends React.HTMLProps<HTMLDivElement> {}

type ModalStylingProps = {
  borderRadius: string;
  backgroundColor: string;
  padding: string;
  boxShadow: string;
};

const createModal =
  ({
    borderRadius,
    backgroundColor,
    padding,
    boxShadow,
  }: ModalStylingProps): React.FC<ModalProps> =>
  ({ children, onClick, ...rest }) => {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation(), onClick;
        }}
        style={{ borderRadius, backgroundColor, padding, boxShadow }}
        className={styles.modal}
        {...rest}
      >
        {children}
      </div>
    );
  };

export const Modal = createModal({
  borderRadius: "2rem",
  backgroundColor: "var(--gray-2x-light)",
  padding: "2rem",
  boxShadow: "var(--shadow-lg)",
});
