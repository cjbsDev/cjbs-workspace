import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { endMonthAtom, startMonthAtom } from "../../../../recoil/dashboardAtom";
import { SelectBox2, SelectBox3 } from "cjbsDSTM";
import { dashboardMonthData } from "../../../../../../data/inputDataLists";
import { toast } from "react-toastify";

const EndMonthSelect = () => {
  const [endMonth, setEndMonth] = useRecoilState(endMonthAtom);
  const getStartMonth = useRecoilValue(startMonthAtom);

  const handleMonth = (event: { target: { value: any } }) => {
    const getMonth = event.target.value;

    if (getStartMonth > getMonth) {
      // console.log("다시 선택해 주세요.!");
      toast("시작 월 보다 작을 수 없습니다!", {
        position: "top-center",
      });
    } else {
      setEndMonth(getMonth);
    }
  };
  return (
    <SelectBox3
      options={dashboardMonthData}
      value={endMonth}
      onChange={handleMonth}
    />
  );
};

export default EndMonthSelect;
