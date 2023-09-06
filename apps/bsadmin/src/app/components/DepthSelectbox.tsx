import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

export default function DepthSelectbox() {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Depth(GB)`,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log(data);

  return (
    <SelectBox
      // required={true}
      errorMessage="Depth를 선택헤 주세요."
      inputName="depthMc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
