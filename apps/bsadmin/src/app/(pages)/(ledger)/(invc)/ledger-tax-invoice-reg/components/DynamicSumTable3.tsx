import React, { useEffect } from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD, TH } from "cjbsDSTM";
import InputPrice from "./InputPrice";
import VatValue3 from "./VatValue3";
import TotalPrice3 from "./TotalPrice3";
import { useFormContext } from "react-hook-form";

const DynamicSumTable3 = () => {
  const { watch, setValue } = useFormContext();
  const getPymtInfoCc = watch("pymtInfoCc");
  useEffect(() => {
    // setValue("totalSupplyPrice", 0);
    // setValue("vat", 0);
    // setValue("totalPrice", 0);
  }, [getPymtInfoCc]);
  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>총 공급가액</TH>
            <TD align="right" sx={{ width: "20%" }}>
              <InputPrice inputName="totalSupplyPrice3" unit="PRICE" />
            </TD>
            <TH sx={{ width: "15%" }}>부가세</TH>
            <TD align="right">
              <VatValue3 />
            </TD>
            <TH sx={{ width: "15%" }}>합계금액</TH>
            <TD align="right">
              <TotalPrice3 />
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicSumTable3;
