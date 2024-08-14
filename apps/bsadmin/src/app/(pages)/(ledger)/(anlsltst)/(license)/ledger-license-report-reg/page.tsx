import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonTableModalLoading } from "cjbsDSTM";

const LazyLicenseRegView = dynamic(() => import("./LicenseRegView"), {
  ssr: false,
  loading: () => <SkeletonTableModalLoading />,
});

export default function Page() {
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyLicenseRegView />
    </ErrorContainer>
  );
}
