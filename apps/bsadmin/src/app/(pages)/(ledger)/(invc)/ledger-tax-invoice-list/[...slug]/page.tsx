import dynamic from "next/dynamic";
import { SkeletonLoading } from "cjbsDSTM";
const LazyTaxInvoiceInfo = dynamic(() => import("./TaxInvoiceInfo"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});
export default function Page() {
  return <LazyTaxInvoiceInfo />;
}
