import React from "react";
import {
  Box,
  BoxProps,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { InputValidation, TD, TH } from "cjbsDSTM";
import DataTable from "./NewDataTable";
import { useFormContext } from "react-hook-form";

const Index = () => {
  const { watch, setValue } = useFormContext();
  const srvcTypeWatch = watch("srvcTypeMc");
  // BS_0100017006
  return (
    <>
      {srvcTypeWatch !== "BS_0100017006" && <DataTable />}

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
                  InputProps={{
                    readOnly: srvcTypeWatch !== "BS_0100017006",
                  }}
                />
              </TD>
              <TH sx={{ width: "15%" }}>샘플 정보</TH>
              <TD sx={{ width: "35%" }}>
                <InputValidation
                  sx={{ width: 255 }}
                  inputName="sampleInfo"
                  required={true}
                  errorMessage="샘플 번호를 입력해 주세요."
                  InputProps={{
                    readOnly: srvcTypeWatch !== "BS_0100017006",
                  }}
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

const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
