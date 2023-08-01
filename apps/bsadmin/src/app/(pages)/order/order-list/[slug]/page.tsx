import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyOrderInfo = dynamic(() => import("./OrderInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
const OrderInfoPage = () => {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyOrderInfo />
    </ErrorContainer>
  );
};

export default OrderInfoPage;
