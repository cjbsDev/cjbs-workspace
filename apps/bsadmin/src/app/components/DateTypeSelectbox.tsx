import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function DateTypeSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=order&midValue=date`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log("날짜 ....", data);

  return (
    <SelectBox inputName="dateTypeCc" options={data} sx={{ width: "100%" }} />
  );
}
