import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

export default function ConditionSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=sample&midValue=status`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data);

  return (
    <SelectBox
      inputName="statusCc"
      options={data}
      sx={{ width: "100%" }}
      required={true}
      errorMessage="상태를 선택해 주세요."
    />
  );
}
