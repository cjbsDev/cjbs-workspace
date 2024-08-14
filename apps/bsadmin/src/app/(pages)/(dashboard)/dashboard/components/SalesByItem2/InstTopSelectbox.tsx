import { ContainedButton, SelectBox2 } from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";
import useDashboardParams from "../../hooks/useDashboardParams";
import { useRecoilState } from "recoil";
import {
  agncTopSelectAtom,
  instTopSelectAtom,
  startMonthAtom,
} from "../../recoil/dashboardAtom";
import { useState } from "react";

export default function InstTopSelectbox() {
  const { startMonth, startYear, endMonth, endYear, typeCc } =
    useDashboardParams();
  const [state, setState] = useState<string>("");
  const [recoilState, setRecoilState] = useRecoilState(instTopSelectAtom);
  const { data } = useSWR(
    `/dashboard/group/BS_2200002?startYear=${startYear}&startMonty=${startMonth}&endYear=${endYear}&endMonty=${endMonth}`,
    fetcher,
    {
      suspense: true,
    },
  );

  const handleChange = (event: { target: { value: any } }) => {
    const { value } = event.target;
    console.log("거래처 설텍트 박스 값 ==>>", value);
    setState(value);
  };

  return <SelectBox2 options={data} value={state} onChange={handleChange} />;
}
