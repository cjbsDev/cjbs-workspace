"use client";

import React, { useMemo, useState, useEffect } from "react";
import { DataTableBase } from "cjbsDSTM";
import { Box, Stack } from "@mui/material";

import useSWR from "swr";
import axios from "axios";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface LogProps {
  region_1_gc?: string;
  region_2_gc?: string;
}

/**
 *
 * @param param0
 * 지역1, 지역2 컴포넌트 붙일 예정
 * @returns
 */

const LocationSelectKor = ({ region_1_gc, region_2_gc }: LogProps) => {
  const [reg1KorOption, setReg1KorOption] = useState([]); // 도시 데이터
  const [reg2KorOption, setReg2KorOption] = useState([]); // 도시에 따른 지역구 데이터
  const [selectReg1Option, setSelectReg1Option] = useState("seoul"); // 도시 선택 값
  const [selectReg2Option, setSelectReg2Option] = useState("w"); // 도시에 따른 지역구 선택 값

  const handleReg1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("국내 선택 01", event.target.value);
    setSelectReg1Option(event.target.value);
    //const methods = useFormContext();
    //const moreDetail = methods.watch("checkTest");
  };
  const handleReg2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("국내 선택 02", event.target.value);
    setSelectReg2Option(event.target.value);
  };

  // 첫번째 선택 ( 국내 lev1 )
  const { data: domesticData } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topValue=domestic`,
    fetcher,
    {
      onSuccess: (data) => {
        console.log("in domesticData", data);
        //console.log("Returned data:", domesticData.data);
        const reg1KorOptionTemp = data.data.map((item: any) => ({
          value: item.codeValue,
          optionName: item.codeNm,
        }));

        console.log("--- reg1KorOptionTemp", reg1KorOptionTemp);
        setReg1KorOption(reg1KorOptionTemp);
      },
    }
  );

  // 두번째 선택 ( 국내 lev2 )
  const { data: domesticDataLv2 } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly?topValue=domestic&midValue=` +
      selectReg1Option,
    fetcher,
    {
      onSuccess: (data) => {
        console.log("in domesticDataLv2", data);
        //console.log("Returned data:", domesticData.data);
        const reg2KorOptionTemp = data.data.map((item: any) => ({
          value: item.codeValue,
          optionName: item.codeNm,
        }));

        console.log("--- reg2KorOptionTemp", reg2KorOptionTemp);
        setReg2KorOption(reg2KorOptionTemp);
      },
    }
  );

  const { data: custModifyLogTemp } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/${apiName}/log/${uKey}`,
    fetcher,
    {
      suspense: true,
    }
  );

  const custModifyLogList = custModifyLogTemp.data.updateLogList;

  const columns = [
    {
      name: "변경일",
      selector: (row: { modifiedAt: any }) => row.modifiedAt,
      width: "20%",
    },
    {
      name: "변경자",
      cell: (row: { updatedByNm: any; updatedByEmail: any }) => (
        <>
          <Stack
            direction="row"
            spacing={0.4}
            alignItems="center"
            useFlexGap
            flexWrap="wrap"
          >
            <Box>{row.updatedByNm}</Box>
            <Box>( {row.updatedByEmail} )</Box>
          </Stack>
        </>
      ),
      minWidth: "150px",
      width: "20%",
    },

    {
      name: "컬럼",
      selector: (row: { targetColNm: any }) => row.targetColNm,
      width: "20%",
    },
    {
      name: "변경 전",
      selector: (row: { preUpdateValue: any }) => row.preUpdateValue,
      width: "20%",
    },
    {
      name: "변경 후",
      selector: (row: { postUpdateValue: any }) => row.postUpdateValue,
      width: "20%",
    },
  ];

  return (
    <DataTableBase
      data={custModifyLogList}
      columns={columns}
      selectableRows={false}
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 20]}
      customStyles={dataTableCustomStyles2}
    />
  );
};

export default LocationSelectKor;
