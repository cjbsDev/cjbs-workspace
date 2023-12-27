import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";
import dynamic from "next/dynamic";

const LazyRegView = dynamic(() => import("./OrderRegView"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return <ErrorContainer FallbackComponent={Fallback}></ErrorContainer>;
}
