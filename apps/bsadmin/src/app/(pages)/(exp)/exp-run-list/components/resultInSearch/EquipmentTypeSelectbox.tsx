import { SelectBox } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";

// RUN Type
export default function EquipmentTypeSelectbox(props) {
  const { data } = useSWR(
    `/code/list/shortly/value?topValue=Experiment Machine&midValue=none`,
    fetcher,
    {
      suspense: true,
    },
  );

  return (
    <SelectBox
      {...props}
      inputName="machineMc"
      options={data}
      sx={{ width: "100%" }}
    />
  );
}
