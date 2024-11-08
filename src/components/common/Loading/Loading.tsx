import React from "react";
import Layout from "../../layout/Layout/Layout";
import Spinner from "../Spinner/Spinner";

type LoadingProps = {
  layoutName?: string;
};

const Loading: React.FC<LoadingProps> = ({ layoutName = "Dashboard" }) => {
  return (
    <div data-testid="loading">
      <Layout name={layoutName}>
        <Spinner />
      </Layout>
    </div>
  );
};

export default Loading;
