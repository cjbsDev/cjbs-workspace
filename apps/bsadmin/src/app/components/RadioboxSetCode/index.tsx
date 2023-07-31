import React from "react";
import { RadioSV } from "cjbsDSTM";

interface RadioboxListProps {
  inputName: string;
  dataList: any;
}

const RadioboxList: React.FC<RadioboxListProps> = ({ inputName, dataList }) => {
  //const { btmValueList } = data;
  //console.log(topCodeMc, btmValueList);

  return (
    <>
      {dataList.map((item: any) => (
        <RadioSV
          key={item.btmCodeMc}
          inputName={inputName}
          labelText={item.btmCodeVal}
          value={item.btmCodeMc}
          required={false}
        />
      ))}
    </>
  );
};

export default RadioboxList;
