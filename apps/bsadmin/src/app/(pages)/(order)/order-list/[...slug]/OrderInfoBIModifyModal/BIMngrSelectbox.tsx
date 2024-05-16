import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
// import fetcher from "../../../../../func/fetcher";
import { fetcher } from "api";

export default function BIMngrSelectbox() {
  const { data } = useSWR(
    `/code/user/BS_0100003013/list?topValue=Department`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("biMngrUkey", data);

  return <SelectBox inputName="biMngrUkey" options={data} />;
}
