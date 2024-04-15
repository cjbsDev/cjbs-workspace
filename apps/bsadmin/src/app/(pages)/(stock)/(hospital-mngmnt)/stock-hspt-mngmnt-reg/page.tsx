import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";

const LazyReg = dynamic(() => import("./HospitalMngmntReg"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyReg />
    </ErrorContainer>
  );
}
