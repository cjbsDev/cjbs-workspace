import React from "react";
import {
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { DataCountResultInfo, FileDownloadBtn, TD, TH } from "cjbsDSTM";
import KeywordSearch from "../../../../../../../../components/KeywordSearch";
import DisplayMoney from "../../../../../../../../components/DisplayMoney";

const Index = ({
  totalElements,
  result,
  totalAnlsPrice,
  totalPymtPrice,
  rmnPrice,
}) => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ mt: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          spacing={1}
          sx={{ mb: 0.5 }}
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <DataCountResultInfo totalCount={totalElements} />
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <FileDownloadBtn
              exportUrl={`/agnc/pymt/list/download${result}`}
              iconName="xls3"
            />
            <KeywordSearch />
            {/*<ResultInSearch/>*/}
          </Stack>
        </Stack>

        <TableContainer sx={{ mb: 1, mt: 1 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH>분석 누적 총계</TH>
                <TD sx={{ width: "23%", textAlign: "right" }}>
                  <DisplayMoney price={totalAnlsPrice} />
                </TD>
                <TH>결제 누적 총계</TH>
                <TD sx={{ width: "23%", textAlign: "right" }}>
                  <DisplayMoney price={totalPymtPrice} />
                </TD>
                <TH sx={{ color: "red" }}>결제대기 누적 금액</TH>
                <TD sx={{ width: "23%", textAlign: "right", color: "red" }}>
                  <DisplayMoney price={rmnPrice} />
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Index;
