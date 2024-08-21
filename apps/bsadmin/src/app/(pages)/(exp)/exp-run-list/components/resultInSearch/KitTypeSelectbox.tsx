import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

// RUN Type
export default function KitTypeSelectbox(props) {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Experiment Kit&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <SelectBox
      {...props}
      inputName="kitMc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
