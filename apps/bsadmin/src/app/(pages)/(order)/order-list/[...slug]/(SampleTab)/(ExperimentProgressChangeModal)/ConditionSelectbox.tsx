import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../../../../../../func/fetcher";

export default function ConditionSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=sample&midValue=status`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data.data);

  return (
    <SelectBox
      inputName="statusCc"
      options={data.data}
      sx={{ width: "100%" }}
      required={true}
      errorMessage="상태를 선택해 주세요."
    />
  );
}