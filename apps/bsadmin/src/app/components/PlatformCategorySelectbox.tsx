import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

export default function PlatformCategorySelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Platform&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  // console.log(data);

  return (
    <SelectBox
      // required={true}
      errorMessage="플랫폼 종류를 선택헤 주세요."
      inputName="pltfMc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
