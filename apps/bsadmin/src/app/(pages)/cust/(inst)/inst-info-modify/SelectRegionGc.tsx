import React, { useState } from "react";
import { SelectBox } from "cjbsDSTM";
import { Stack } from "@mui/material";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";

interface ModalContainerProps {
  //onClose: () => void;
  val1?: string;
  val2?: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const SelectRegionGc = ({ val1, val2 }: ModalContainerProps) => {
  const [reg1KorOption, setReg1KorOption] = useState([]); // 도시 데이터
  const [reg2KorOption, setReg2KorOption] = useState([]); // 도시에 따른 지역구 데이터
  const [selectReg1Option, setSelectReg1Option] = useState(); // 도시 선택 값
  const [selectReg2Option, setSelectReg2Option] = useState(); // 도시에 따른 지역구 선택 값

  const handleReg1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("국내 선택 01", event.target.value);
    setSelectReg1Option(event.target.value);
    //const methods = useFormContext();
    //const moreDetail = methods.watch("checkTest");
  };
  const handleReg2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    //console.log("국내 선택 02", event.target.value);
    setSelectReg2Option(event.target.value);
  };

  // 첫번째 선택 ( 국내 lev1 )
  const { data: domesticData } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topUniqueCode=BS_0200002`,
    fetcher,
    {
      onSuccess: (data) => {
        const reg1KorOptionTemp = data.data.map((item: any) => ({
          value: item.uniqueCode,
          optionName: item.codeNm,
        }));
        console.log("set 01");
        setReg1KorOption(reg1KorOptionTemp);
      },
    }
  );

  // 두번째 선택 ( 국내 lev2 )
  const { data: domesticDataLv2 } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/code/list/shortly?topUniqueCode=BS_0200002&midUniqueCode=` +
      selectReg1Option,
    fetcher,
    {
      onSuccess: (data) => {
        const reg2KorOptionTemp = data.data.map((item: any) => ({
          value: item.uniqueCode,
          optionName: item.codeNm,
        }));
        console.log("set 02");
        setReg2KorOption(reg2KorOptionTemp);
      },
    }
  );
  console.log("val1 : " + val1 + " / val2 : " + val2);

  const { setValue } = useFormContext();
  //setValue("region1Gc", val1);
  //setValue("region2Gc", val2);

  return (
    <Stack direction="row" spacing={0.5} alignItems="flex-start">
      <SelectBox
        inputName="region1Gc"
        options={reg1KorOption}
        onChange={handleReg1Change}
      />
      <SelectBox
        inputName="region2Gc"
        options={reg2KorOption}
        onChange={handleReg2Change}
        sx={{ ml: 10 }}
      />
    </Stack>
  );
};

export default SelectRegionGc;
