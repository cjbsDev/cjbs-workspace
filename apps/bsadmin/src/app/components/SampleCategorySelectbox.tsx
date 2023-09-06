import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function SampleCategorySelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=sample&midValue=category`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data);

  return (
    <SelectBox
      required={true}
      errorMessage="샘플 종류를 선택헤 주세요."
      inputName="sampleTypeCc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
