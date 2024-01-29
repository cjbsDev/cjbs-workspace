import dynamic from "next/dynamic";
import { ErrorContainer, Fallback, SkeletonLoading } from "cjbsDSTM";
const LazyList = dynamic(() => import("./List"), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/expt/info/list?page=1&size=15`,
  );
  const resData = await res.json();
  const data = resData.data;

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return data;
}

const Index = async () => {
  const data = await getData();
  return (
    <ErrorContainer FallbackComponent={Fallback}>
      <LazyList data={data.exptInfoList} />
    </ErrorContainer>
  );
};

export default Index;
