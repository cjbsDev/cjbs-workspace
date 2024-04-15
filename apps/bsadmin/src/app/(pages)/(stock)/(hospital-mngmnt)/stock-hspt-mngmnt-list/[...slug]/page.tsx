import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyView = dynamic(() => import("./DetailView"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyView />
    </ErrorContainer>
  );
}
