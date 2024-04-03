import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import React from "react";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyAgncInfo = dynamic(() => import("./AgncInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading height={270} />,
});
export default function AgncPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyAgncInfo />
    </ErrorContainer>
  );
}
