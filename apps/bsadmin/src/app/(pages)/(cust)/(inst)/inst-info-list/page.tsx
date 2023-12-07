import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyListInst = dynamic(() => import("./ListInst"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function ManagementPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyListInst />
    </ErrorContainer>
  );
}
