import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import fetcher from "../func/fetcher";

export default function SampleCategorySelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=sample&midValue=category`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data.data);

  return (
    <SelectBox
      // required={true}
      errorMessage="샘플 종류를 선택헤 주세요."
      inputName="sampleTypeCc"
      options={data.data}
      sx={{ width: "100%" }}
    />
  );
}
