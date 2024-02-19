"use client";

import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";

const LazyCustPayTab = dynamic(() => import("./CustPayTab"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyCustPayTab />
    </ErrorContainer>
  );
};