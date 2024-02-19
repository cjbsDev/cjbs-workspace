import React from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useRecoilValue } from "recoil";
import { sampleUkeyAtom } from "../../atom";
import DataTable from "./dataTable";

const List = () => {
  const sampleUkey = useRecoilValue(sampleUkeyAtom);
  const { data } = useSWR(`/expt/info/${sampleUkey}/prep`, fetcher, {
    suspense: true,
  });

  console.log("PREP DATA ==>>", data);

  return <DataTable data={data} />;
};

export default List;
