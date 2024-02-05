import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyDataList = dynamic(() => import("./components/list"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataList />
    </ErrorContainer>
  );
}
