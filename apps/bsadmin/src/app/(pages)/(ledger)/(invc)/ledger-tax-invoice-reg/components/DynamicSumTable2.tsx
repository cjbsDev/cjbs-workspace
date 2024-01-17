import React from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD, TH } from "cjbsDSTM";
import InputPrice from "./InputPrice";
import VatValue from "./VatValue";
import TotalPrice from "./TotalPrice";

const DynamicSumTable2 = () => {
  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>총 공급가액</TH>
            <TD align="right" sx={{ width: "20%" }}>
              <InputPrice inputName="totalSupplyPrice" />
            </TD>
            <TH sx={{ width: "15%" }}>부가세</TH>
            <TD align="right">
              <VatValue />
            </TD>
            <TH sx={{ width: "15%" }}>합계금액</TH>
            <TD align="right">
              <TotalPrice />
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DynamicSumTable2;
