"use client";

import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";
import { useSearchParams } from "next/navigation";

const LazyAnalysisRegView = dynamic(() => import("./AnalysisRegView"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

const LazyAnalysisRegFromOrderView = dynamic(
  () => import("./AnalysisRegFromOrderView"),
  {
    ssr: false,
    loading: () => <SkeletonTableModalLoading />,
  },
);

export default function Page() {
  const searchParams = useSearchParams();
  const orderUkey = searchParams.get("orderUkey");

  if (orderUkey) {
    return (
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyAnalysisRegFromOrderView />
      </ErrorContainer>
    );
  }

  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyAnalysisRegView />
    </ErrorContainer>
  );
}
