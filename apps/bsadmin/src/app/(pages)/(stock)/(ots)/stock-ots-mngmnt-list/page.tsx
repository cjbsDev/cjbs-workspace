import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyList = dynamic(() => import("./OtsMngmntList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyList />
    </ErrorContainer>
  );
}
