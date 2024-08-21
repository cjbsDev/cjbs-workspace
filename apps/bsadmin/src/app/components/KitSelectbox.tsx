import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

// Kit /code/mngr/list?enumMngrCode=MCHN_KIT&topUniqueCode=${topUniqueCode}&midUniqueCode=none
// * 장비 topUniqueCode 값이 필요함 *
export default function KitSelectbox(props) {
  const { watch, getValues } = useFormContext();
  const topUniqueCode = watch("mcNmCc");
  console.log("장비UniqueCode", JSON.stringify(topUniqueCode));
  const { data: kitData } = useSWR(
    topUniqueCode ? `/code/run/mchn/list?type=` + topUniqueCode : null,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("Kit List ==>>", kitData);

  if (!kitData) {
    return <p>장비를 선택 하세요.</p>;
  }

  return (
    <SelectBox
      {...props}
      inputName="kitMc"
      options={kitData}
      sx={{ width: "100%" }}
    />
  );
}
