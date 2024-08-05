import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import { fetcher } from "api";
import useSWR from "swr";

export default function AnalysisTypeSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly?topUniqueCode=BS_0100006`,
    fetcher,
    {
      suspense: true,
    },
  );
  console.log("data ==>>", data);

  return (
    <SelectBox
      required={true}
      errorMessage="분석종류를 선택하세요."
      inputName="anlsTypeMc"
      options={data}
      // resetFiledName="platformMc"
    />
  );
}
