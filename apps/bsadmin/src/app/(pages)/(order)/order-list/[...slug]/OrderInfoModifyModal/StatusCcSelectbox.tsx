import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function StatusCcSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=order&midValue=status`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log("StatusCcSelectbox ==>>", data);

  return (
    <SelectBox
      required={true}
      errorMessage="진행사황을 선택헤 주세요."
      inputName="orderStatusCc"
      options={data}
    />
  );
}
