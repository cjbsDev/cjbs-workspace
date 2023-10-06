import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyDataList = dynamic(() => import("./ListSample"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
const RunListPage = () => {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataList />
    </ErrorContainer>
  );
};

export default RunListPage;
