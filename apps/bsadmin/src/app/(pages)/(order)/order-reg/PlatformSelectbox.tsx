import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import { fetcher } from "api";
import useSWR from "swr";

export default function PlatformSelectbox() {
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;
  const initValue = getValues("anlsTypeMc");

  // const { data } = useSWR(`/code/order/pltf/list?type=${initValue}`, fetcher, {
  //   suspense: true,
  // });
  // /code/mngr/list?enumMngrCode=SRVC_CTGR&topUniqueCode=BS_0100005001&midUniqueCode=${initValue}

  const { data, isLoading, error } = useSWR(
    `/code/order/pltf/list?type=${initValue}`,
    fetcher,
  );

  if (error) return <div>분석종류를 선택하세요!</div>;
  if (isLoading) return <div>Loading...</div>;

  console.log("Platform Data ==>>", data);

  return (
    <SelectBox
      inputName="pltfMc"
      options={data}
      // required={true}
      // errorMessage="플랫폼을 선택해 주세요."
    />
  );
}
