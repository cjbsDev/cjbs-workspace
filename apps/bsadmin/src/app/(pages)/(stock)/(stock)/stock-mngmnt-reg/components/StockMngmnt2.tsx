import React from "react";
import { SelectBox } from "cjbsDSTM";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { fetcher } from "api";

const StockMngmnt2 = () => {
  const { watch } = useFormContext();
  const depart = watch("departMngrMc");
  console.log("depart", depart);

  const { data } = useSWR(
    depart !== null ? `/code/user/${depart}/list` : null,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("담당자 ==>>", data);

  return (
    <SelectBox
      required={true}
      errorMessage="재고 담당자를 선택헤 주세요."
      inputName="mngrUkey"
      options={data}
      // sx={{ width: "100%" }}
    />
  );
};

export default StockMngmnt2;
