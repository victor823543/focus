import React from "react";

type HalfCircleProgressProps = {
  progress: number; // from 0 to 100
  size: number;
  strokeWidth?: number;
  backgroundColor?: string;
  foregroundColor?: string;
  children?: React.ReactNode; // content displayed in the center
};

const HalfCircleProgress: React.FC<HalfCircleProgressProps> = ({
  progress,
  size,
  strokeWidth = 10,
  backgroundColor = "var(--gray-light-tr)",
  foregroundColor = "var(--primary-color-light)",
  children,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const progressLength = (progress / 100) * circumference;

  return (
    <div style={{ position: "relative", width: size, height: size / 2 }}>
      <svg
        width={size}
        height={size / 2}
        viewBox={`0 0 ${size} ${size / 2}`}
        style={{ overflow: "visible" }}
      >
        {/* Background half-circle */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} a ${radius},${radius} 0 0,1 ${size - strokeWidth},0`}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        {/* Foreground half-circle */}
        <path
          d={`M ${strokeWidth / 2},${size / 2} a ${radius},${radius} 0 0,1 ${size - strokeWidth},0`}
          stroke={foregroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${progressLength}, ${circumference}`}
          strokeLinecap="round"
        />
      </svg>

      {/* Children in center */}
      <div
        style={{
          position: "absolute",
          top: "100%",
          left: "50%",
          transform: "translate(-50%, -80%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: size * 0.2,
          color: foregroundColor,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HalfCircleProgress;
