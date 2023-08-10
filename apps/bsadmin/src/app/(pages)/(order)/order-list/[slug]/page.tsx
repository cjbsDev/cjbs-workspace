import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import OrderInfo from "./OrderInfo";

// const LazyOrderInfo = dynamic(() => import("./OrderInfo"), {
//   ssr: false,
//   loading: () => <SkeletonLoading />,
// });
const OrderInfoPage = () => {
  return (
    // <ErrorContainer FallbackComponent={Fallback}>
    //   <LazyOrderInfo />
    // </ErrorContainer>
    <OrderInfo />
  );
};

export default OrderInfoPage;
