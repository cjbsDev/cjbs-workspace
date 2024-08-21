import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

// RUN Type
export default function RunTypeSelectbox(props) {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Run Service Type&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <SelectBox
      {...props}
      inputName="runTypeMc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
