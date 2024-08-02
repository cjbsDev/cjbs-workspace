import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
// import fetcher from "../../../../../func/fetcher";
import { fetcher } from "api";

export default function PrepSelectbox() {
  const { data } = useSWR(
    `/code/user/BS_0100003011/list?topValue=Department`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log("prepMngrUkey", data);

  return <SelectBox inputName="prepMngrUkey" options={data} />;
}
