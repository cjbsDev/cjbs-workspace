import React from "react";
import { Checkbox } from "cjbsDSTM";

interface CheckboxListProps {
  data: any;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ data }) => {
  const { topCodeMc, btmValueList } = data;
  //console.log("topCodeMc", topCodeMc);

  return (
    <>
      {btmValueList.map((item: any) => (
        <Checkbox
          key={item.btmCodeMc}
          inputName={topCodeMc}
          labelText={item.btmCodeVal}
          value={item.btmCodeMc}
        />
      ))}
    </>
  );
};

export default CheckboxList;
