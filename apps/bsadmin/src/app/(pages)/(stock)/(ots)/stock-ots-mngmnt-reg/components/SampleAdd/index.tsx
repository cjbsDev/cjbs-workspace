import React, { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
  Won,
} from "cjbsDSTM";
import { useFormContext } from "react-hook-form";
import AmountFormat from "../../../../../../components/NumberFormat/AmountFormat";
import useCenteredPopup from "../../../../../../hooks/useCenteredPopup";
import { useSearchParams } from "next/navigation";
import DataTable from "./DataTable";

const Index = () => {
  // const [sampleList, setSampleList] = useState([]);
  const searchParams = useSearchParams();
  const orshType = searchParams.get("orshType");
  const { isOpen, openPopup, closePopup } = useCenteredPopup(
    `/sampleSimpleListPopup`,
    "샘플 검색",
    1642,
    557,
  );
  // const { watch, setValue } = useFormContext();
  // const srvcTypeWatch = watch("srvcTypeMc");
  // console.log("srvcTypeWatch", srvcTypeWatch);

  // useEffect(() => {
  //   window.addEventListener("mySampleSimpleData", function (e) {
  //     console.log("mySampleSimpleData Received data:", e.detail);
  //     setSampleList(e.detail);
  //   });
  // }, [sampleList]);

  return (
    <>
      {/*{srvcTypeWatch !== "BS_0100017006" && (*/}
      {/*  <Stack*/}
      {/*    sx={{ backgroundColor: cjbsTheme.palette.grey["200"], py: 5, mb: 1 }}*/}
      {/*    spacing={0.5}*/}
      {/*    useFlexGap*/}
      {/*    flexWrap="wrap"*/}
      {/*    justifyContent="center"*/}
      {/*    alignItems="center"*/}
      {/*  >*/}
      {/*    <Typography>버튼을 클릭하면 샘플을 추가 할 수 있습니다.</Typography>*/}
      {/*    <OutlinedButton*/}
      {/*      buttonName="샘플추가"*/}
      {/*      size="small"*/}
      {/*      onClick={openPopup}*/}
      {/*    />*/}
      {/*  </Stack>*/}
      {/*)}*/}

      {/*{JSON.stringify(sampleList)}*/}

      <DataTable />

      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>오더 정보</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="orderInfo"
                  required={true}
                  errorMessage="오더 번호 입력해 주세요."
                />
              </TD>
              <TH sx={{ width: "15%" }}>샘플 정보</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="sampleInfo"
                  required={true}
                  errorMessage="샘플 번호를 입력해 주세요."
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Index;
