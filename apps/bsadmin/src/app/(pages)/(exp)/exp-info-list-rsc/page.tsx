import { Suspense } from "react";
import DataList from "./components/DataList";
import Loading from "./loading";

export default async function Page() {
  return (
    <>
      <h1>EXP-INFO-LIST!</h1>
      <Suspense fallback={<Loading />}>
        <DataList />
      </Suspense>
    </>
  );
}
