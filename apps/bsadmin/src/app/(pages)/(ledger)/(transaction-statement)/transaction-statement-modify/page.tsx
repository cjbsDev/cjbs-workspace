"use client";

import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";

const LazyTSRegView = dynamic(() => import("./TSModify"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyTSRegView />
    </ErrorContainer>
  );
}
