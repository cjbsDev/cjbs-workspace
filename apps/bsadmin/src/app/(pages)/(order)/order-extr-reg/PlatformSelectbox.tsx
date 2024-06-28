import { SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import { fetcher } from "api";
import useSWR from "swr";

export default function PlatformSelectbox() {
  const methods = useFormContext();
  const { setValue, getValues, watch } = methods;
  const initValue = watch("anlsTypeMc");

  // const { data } = useSWR(`/code/order/pltf/list?type=${initValue}`, fetcher, {
  //   suspense: true,
  // });
  // /code/mngr/list?enumMngrCode=SRVC_CTGR&topUniqueCode=BS_0100005001&midUniqueCode=${initValue}

  const { data } = useSWR(`/code/order/pltf/list?type=${initValue}`, fetcher, {
    suspense: true,
  });

  console.log("Platform Data ==>>", data);

  return <SelectBox inputName="pltfMc" options={data} />;
}
