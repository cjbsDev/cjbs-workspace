"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";
// import { useRouter } from "next/navigation";
import { useState } from "react";

const LazyListCust = dynamic(() => import("./ListCust"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function ManagementPage() {
  // const router = useRouter();
  const [someKey, setSomeKey] = useState<boolean>(false);

  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyListCust />
    </ErrorContainer>
  );
}
