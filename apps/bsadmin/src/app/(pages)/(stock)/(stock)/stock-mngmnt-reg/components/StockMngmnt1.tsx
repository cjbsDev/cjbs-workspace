import React from "react";
import { SelectBox, SelectBox3 } from "cjbsDSTM";
import { groupDepartMngrListData } from "../../../../../data/inputDataLists";

const StockMngmnt1 = () => {
  return (
    <SelectBox
      required={true}
      errorMessage="재고 담당 부서를 선택헤 주세요."
      inputName="departMngrMc"
      options={groupDepartMngrListData}
      defaultOption={false}
      // sx={{ width: "100%" }}
    />
  );
};

export default StockMngmnt1;
