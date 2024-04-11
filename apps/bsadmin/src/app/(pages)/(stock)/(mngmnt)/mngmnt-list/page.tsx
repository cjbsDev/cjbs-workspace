import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyMngmntList = dynamic(() => import("./MngmntList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyMngmntList />
    </ErrorContainer>
  );
}
