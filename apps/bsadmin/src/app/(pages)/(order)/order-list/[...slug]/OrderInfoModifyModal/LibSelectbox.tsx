import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function LibSelectbox() {
  const { data } = useSWR(
    `/code/user/BS_0100003011/list?topValue=Department`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log(data);

  return <SelectBox inputName="libMngrUkey" options={data} />;
}
