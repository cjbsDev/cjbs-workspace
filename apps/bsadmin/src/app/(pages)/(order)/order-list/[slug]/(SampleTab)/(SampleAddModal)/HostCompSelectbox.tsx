import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../../../../../../func/fetcher";

export default function HostCompSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=Sequenced By`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data.data);

  return <SelectBox inputName="prgrAgncNmCc" options={data.data} />;
}
