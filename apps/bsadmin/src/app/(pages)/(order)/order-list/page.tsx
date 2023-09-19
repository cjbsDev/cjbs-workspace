import dynamic from "next/dynamic";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import { BatchRouterProvider } from "next-batch-router";

const LazyDataList = dynamic(() => import("./ListOrder"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
const OrderListPage = () => {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDataList />
    </ErrorContainer>
  );
};

export default OrderListPage;
