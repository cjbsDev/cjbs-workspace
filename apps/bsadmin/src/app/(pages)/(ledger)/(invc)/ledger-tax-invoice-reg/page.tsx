import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";

const LazyRegView = dynamic(() => import("./LegView"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyRegView />
    </ErrorContainer>
  );
}
