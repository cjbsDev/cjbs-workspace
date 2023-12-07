import { ContainedButton, SelectBox } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

// Kit
// * 장비 topUniqueCode 값이 필요함 *
export default function KitSelectbox(props) {
  const { watch } = useFormContext();
  const topUniqueCode = watch("mcNmCc");
  console.log("장비UniqueCode", topUniqueCode);
  const { data: kitData } = useSWR(
    topUniqueCode !== undefined
      ? `/code/mngr/list?enumMngrCode=MCHN_KIT&topUniqueCode=${topUniqueCode}&midUniqueCode=none`
      : null,
    fetcher,
    {
      suspense: true,
    }
  );

  console.log("Kit List ==>>", kitData);

  return topUniqueCode !== undefined ? (
    <SelectBox
      {...props}
      inputName="kitMc"
      options={kitData}
      sx={{ width: "100%" }}
    />
  ) : (
    "장비를 선택하세요."
  );
}
