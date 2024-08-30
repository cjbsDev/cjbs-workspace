import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function AnlsTypeSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Analaysis Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <SelectBox inputName="anlsTypcMc" options={data} sx={{ width: "100%" }} />
  );
}
