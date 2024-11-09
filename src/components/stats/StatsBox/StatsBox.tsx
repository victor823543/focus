import React from "react";
import { Header } from "../../common/Headers/Headers";
import Section from "../../common/Section/Section";
import styles from "./StatsBox.module.css";

type StatsBoxProps = {
  chart: React.ReactNode;
  title: string;
  height?: string;
};

const StatsBox: React.FC<StatsBoxProps> = ({
  chart,
  title,
  height = "20rem",
}) => {
  return (
    <Section className={styles.statsBox}>
      <Header variant="gridbox" center={false}>
        {title}
      </Header>
      <div style={{ height }}>{chart}</div>
    </Section>
  );
};

export default StatsBox;
