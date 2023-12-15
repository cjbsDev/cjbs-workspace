import { ContainedButton, SelectBox2 } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import useDashboardParams from "../../hooks/useDashboardParams";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  agncTopSelectAtom,
  dashboardGroupCcAtom,
  groupTargetAtom,
  startMonthAtom,
} from "../../recoil/dashboardAtom";
import { useState } from "react";

export default function AgncTopSelectbox() {
  const { startMonth, startYear, endMonth, endYear, typeCc } =
    useDashboardParams();
  // const [state, setState] = useState<string>("");
  const [recoilState, setRecoilState] = useRecoilState(groupTargetAtom);
  const groupCc = useRecoilValue(dashboardGroupCcAtom);

  const { data } = useSWR(
    `/dashboard/group/${groupCc}?startYear=${startYear}&startMonty=${startMonth}&endYear=${endYear}&endMonty=${endMonth}`,
    fetcher,
    {
      suspense: true,
    },
  );

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    console.log("기관 설텍트 박스 값 ==>>", value);
    setRecoilState(value);
  };

  return (
    <SelectBox2
      options={data}
      value={recoilState}
      onChange={handleChange}
      sx={{
        mb: `-12px !important`,
        mt: `-24px !important`,
        // py: `0 !important`,
      }}
    />
  );
}
