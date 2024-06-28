import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import { fetcher } from "api";
import useSWR from "swr";

export default function ServiceTypeSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly?topUniqueCode=BS_0100007`,
    fetcher,
    {
      suspense: true,
    },
  );
  return (
    <SelectBox
      required={true}
      errorMessage="서비스 타입을 선택 하세요"
      inputName="srvcTypeMc"
      options={data}
    />
  );
}
