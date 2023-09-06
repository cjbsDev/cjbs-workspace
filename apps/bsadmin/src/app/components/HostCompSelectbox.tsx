import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function HostCompSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Sequenced By`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data);

  return (
    <SelectBox inputName="prgrAgncNmCc" options={data} sx={{ width: "100%" }} />
  );
}
