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
    }
  );

  console.log("서비스 타입 리스트 데이타", data);

  return <SelectBox required={true} inputName="srvcTypeMc" options={data} />;
}
