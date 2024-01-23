import React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";
// import AnalysisInfo from "./AnalysisInfo";

const LazyAnalysisInfo = dynamic(() => import("./LicenseInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});
export default function Page() {
  return (
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyAnalysisInfo />
      </ErrorContainer>
  );
}