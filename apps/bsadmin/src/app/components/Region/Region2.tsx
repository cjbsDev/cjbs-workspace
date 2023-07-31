import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";
//import fetcher from "../../func/fetcher";

import axios from "axios";
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Region2() {
  const { watch } = useFormContext();
  /*
  const { data: domesticData2 } = useSWR(
    () =>
      `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topUniqueCode=BS_0200002&midUniqueCode=` +
      watch("region1Gc"),
    fetcher,
    {
      suspense: true,
    }
  );
  return <SelectBox inputName="region2Gc" options={domesticData2.data} />;
  */

  const region1GcValue = watch("region1Gc");

  // Check if region1GcValue is not undefined before making the API call
  const { data: domesticData2 } = useSWR(
    region1GcValue !== undefined
      ? `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topUniqueCode=BS_0200002&midUniqueCode=${region1GcValue}`
      : null,
    fetcher,
    {
      suspense: true,
    }
  );

  // Only render the SelectBox if the API call has successfully fetched the data
  return domesticData2?.data ? (
    <SelectBox
      inputName="region2Gc"
      options={domesticData2.data}
      defaultOption={false}
    />
  ) : null;
}
