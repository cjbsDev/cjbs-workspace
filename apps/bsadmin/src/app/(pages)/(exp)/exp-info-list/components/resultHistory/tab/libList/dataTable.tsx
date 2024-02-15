import React from "react";
import { useRecoilValue } from "recoil";
import { sampleUkeyAtom } from "../../atom";
import useSWR from "swr";
import { fetcher } from "api";

const DataTable = () => {
  const sampleUkey = useRecoilValue(sampleUkeyAtom);
  const { data } = useSWR(`/expt/info/${sampleUkey}/lib`, fetcher, {
    suspense: true,
  });

  console.log("LIB DATA ==>>", data);
  return <div>{sampleUkey}</div>;
};

export default DataTable;
