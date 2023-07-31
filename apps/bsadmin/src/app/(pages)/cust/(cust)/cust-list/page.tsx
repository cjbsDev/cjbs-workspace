import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyListCust = dynamic(() => import("./ListCust"), {
  ssr: false,
  loading: () => <SkeletonLoading height={800} />,
});

export default function ManagementPage() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyListCust />
    </ErrorContainer>
  );
}
