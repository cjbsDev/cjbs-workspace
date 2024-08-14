import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, FullHeightLoading } from "cjbsDSTM";

const LazyDashboard = dynamic(() => import("./components/Dashboard"), {
  ssr: false,
  loading: () => <FullHeightLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyDashboard />
    </ErrorContainer>
  );
}
