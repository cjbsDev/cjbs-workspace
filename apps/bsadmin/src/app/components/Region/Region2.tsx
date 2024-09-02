import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import React from "react";
import useSWR from "swr";
import { fetcher } from "api";

export default function Region2() {
  const { watch } = useFormContext();
  const region1GcValue = watch("region1Gc");

  // Check if region1GcValue is not undefined before making the API call
  const { data: domesticData2 } = useSWR(
    region1GcValue !== undefined
      ? `/code/list/shortly?topUniqueCode=BS_0200002&midUniqueCode=${region1GcValue}`
      : null,
    fetcher,
    {
      suspense: true,
    },
  );

  // Only render the SelectBox if the API call has successfully fetched the data
  return domesticData2 ? (
    <SelectBox
      inputName="region2Gc"
      options={domesticData2}
      defaultOption={false}
    />
  ) : null;
}
