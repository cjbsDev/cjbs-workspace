import dynamic from "next/dynamic";
import SkeletonLoading from "@components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

//Orshbs
const LazyListOrshbs = dynamic(() => import("./ListOrshbs"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function ManagementPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyListOrshbs />
    </ErrorContainer>
  );
}
