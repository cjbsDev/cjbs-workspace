import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
// import fetcher from "../../../func/fetcher";
import { fetcher } from "api";
import useSWR from "swr";

export default function PlatformSelectbox() {
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;
  const initValue = getValues("anlsTypeMc");
  const analysisValue = watch("anlsTypeMc");

  const { data, isLoading, error } = useSWR(
    `/code/mngr/list?enumMngrCode=SRVC_CTGR&topUniqueCode=BS_0100005001&midUniqueCode=${initValue}`,
    fetcher
  );

  if (error) return <div>분석종류를 선택하세요!</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("data ==>>", data);

  return <SelectBox inputName="platformMc" options={data} />;
}
