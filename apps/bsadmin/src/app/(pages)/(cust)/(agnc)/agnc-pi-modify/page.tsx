import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import * as React from "react";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyAgncPIModify = dynamic(() => import("./AgncPIModify"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
export default function AgncPIModifyPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyAgncPIModify />
    </ErrorContainer>
  );
}
