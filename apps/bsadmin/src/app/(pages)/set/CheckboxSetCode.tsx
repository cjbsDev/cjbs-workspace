import React from "react";
import { Checkbox } from "cjbsDSTM";

interface CheckboxListProps {
  inputName: string;
  dataList: any;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ inputName, dataList }) => {
  //const { btmValueList } = data;
  //console.log(topCodeMc, btmValueList);

  return (
    <>
      {dataList.map((item: any) => (
        <Checkbox
          key={item.btmCodeMc}
          inputName={inputName}
          labelText={item.btmCodeVal}
          value={item.btmCodeMc}
        />
      ))}
    </>
  );
};

export default CheckboxList;
