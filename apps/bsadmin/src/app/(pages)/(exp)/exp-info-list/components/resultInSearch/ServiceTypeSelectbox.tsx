import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function ServiceTypeSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Service Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log("진행상황 리스트", data);

  return (
    <SelectBox inputName="srvcTypeMc" options={data} sx={{ width: "100%" }} />
  );
}
