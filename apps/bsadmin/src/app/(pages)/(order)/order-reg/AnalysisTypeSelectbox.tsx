import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import fetcher from "../../../func/fetcher";
import useSWR from "swr";

export default function AnalysisTypeSelectbox() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topUniqueCode=BS_0100006`,
    fetcher,
    {
      suspense: true,
    }
  );
  console.log("data ==>>", data.data);

  return (
    <SelectBox
      required={true}
      inputName="anlsTypeMc"
      options={data.data}
      resetFiledName="platformMc"
    />
  );
}
