import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function SeqKitSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Experiment Kit&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log("진행상황 리스트", data);

  return (
    <SelectBox inputName="seqUsedKitMc" options={data} sx={{ width: "100%" }} />
  );
}
