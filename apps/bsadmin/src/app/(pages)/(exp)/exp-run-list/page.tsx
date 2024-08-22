import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import ListRun from "./ListRun";

const LazyDataList = dynamic(() => import("./ListRun"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
const RunListPage = () => {
  return (
    // <ListRun />
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataList />
    </ErrorContainer>
  );
};

export default RunListPage;
