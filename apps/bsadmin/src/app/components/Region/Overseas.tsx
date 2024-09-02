import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";
import { fetcher } from "api";

export default function Overseas() {
  const { watch } = useFormContext();
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=overseas&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  return <SelectBox inputName="region1GcOverseas" options={data} />;
}
