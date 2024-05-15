import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
// import fetcher from "../../../../../func/fetcher";
import { fetcher } from "api";

export default function BsnsMngrSelectbox() {
  const { data } = useSWR(
    `/code/user/BS_0100003012/list?topValue=Department`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("bsnsMngrUkey", data);

  return <SelectBox inputName="bsnsMngrUkey" options={data} />;
}
