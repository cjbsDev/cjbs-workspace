import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { ErrorContainer, Fallback } from "cjbsDSTM";
import { RecoilRoot } from "recoil";
import RecoilRootProvider from "../../../../recoilRootProvider";

const LazyList = dynamic(() => import("./MngmntList"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

export default function Page() {
  return (
    <RecoilRootProvider>
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyList />
      </ErrorContainer>
    </RecoilRootProvider>
  );
}
