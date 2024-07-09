import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";
// import fetcher from "../../../../../func/fetcher";

export default function LipSelectbox() {
  const { data } = useSWR(
    `/code/user/BS_0100003011/list?topValue=Department`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log(data);

  return <SelectBox inputName="seqMngrUkey" options={data} />;
}
