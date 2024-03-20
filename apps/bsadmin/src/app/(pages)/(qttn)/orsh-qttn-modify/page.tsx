"use client";

import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";

const LazyModifyQttnView = dynamic(() => import("./ModifyQttn"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyModifyQttnView />
    </ErrorContainer>
  );
}
