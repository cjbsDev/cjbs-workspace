import React, { useEffect } from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD, TH } from "cjbsDSTM";
import InputPrice from "./InputPrice";
import { useFormContext } from "react-hook-form";
import VatValue2 from "./VatValue2";
import TotalPrice2 from "./TotalPrice2";

const DynamicSumTable2 = () => {
  const { watch, setValue } = useFormContext();
  const getPymtInfoCc = watch("pymtInfoCc");
  // useEffect(() => {
  //   setValue("totalSupplyPrice", 0);
  //   setValue("vat", 0);
  //   setValue("totalPrice", 0);
  // }, [getPymtInfoCc]);
  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>총 공급가액</TH>
            <TD align="right" sx={{ width: "20%" }}>
              <InputPrice inputName="totalSupplyPrice2" unit="PRICE" />
            </TD>
            <TH sx={{ width: "15%" }}>부가세</TH>
            <TD align="right">
              <VatValue2 />
            </TD>
            <TH sx={{ width: "15%" }}>합계금액</TH>
            <TD align="right">
              <TotalPrice2 />
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicSumTable2;
