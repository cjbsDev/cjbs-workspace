import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

interface StatusSampleType {
  name: string;
}

export default function StatusSampleTypeSelectbox({ name }: StatusSampleType) {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=sample&midValue=status`,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Sample 진행상황 리스트", data);

  return (
    <SelectBox
      // required={true}
      // errorMessage="샘플 종류를 선택헤 주세요."
      inputName={name}
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
