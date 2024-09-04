import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function TaxonTypeSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=sample&midValue=type`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <SelectBox inputName="taxonCc" options={data} sx={{ width: "100%" }} />
  );
}
