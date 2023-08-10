import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../../../../../func/fetcher";

export default function StatusCcSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=order&midValue=status`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data.data);

  return (
    <SelectBox required={true} inputName="orderStatusCc" options={data.data} />
  );
}
