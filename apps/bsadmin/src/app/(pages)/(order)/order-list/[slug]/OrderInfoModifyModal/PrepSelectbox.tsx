import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../../../../../func/fetcher";

export default function PrepSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/user/BS_0100003011/list?topValue=Department`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data.data);

  return <SelectBox inputName="qcMngrUkey" options={data.data} />;
}
