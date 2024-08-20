import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function StatusTypeSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=order&midValue=status`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log("진행상황 리스트", data);

  return (
    <SelectBox
      // required={true}
      // errorMessage="샘플 종류를 선택헤 주세요."
      inputName="orderStatusCc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
