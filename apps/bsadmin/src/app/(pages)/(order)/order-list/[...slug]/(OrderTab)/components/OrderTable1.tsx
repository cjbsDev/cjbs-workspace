import React from "react";
import {
  Box,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TD, TH } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import AgncDetailInfo from "../../../../../../components/AgncDetailInfo";
import RearchDetailInfo from "../../../../../../components/RearchDetailInfo";

interface OrderTable1Data {
  agncId: string;
  agncNm: string;
  agncUkey: string;
  instNm: string;
  ordrAplctel: string;
  ordrAplcNm: string;
  ordrAplcEmail: string;
  agncLeaderNm: string;
  agncLeaderEmail: string;
  agncLeaderUkey: string;
  isSpecial: string; // 'Y' 또는 'N'
  agncInfoDetail: any;
  agncLeaderInfoDetail: any;
}

interface OrderTable1Props {
  data: OrderTable1Data;
}

const OrderTable1 = ({ data }: OrderTable1Props) => {
  const {
    agncId,
    agncNm,
    agncUkey,
    instNm,
    ordrAplctel,
    ordrAplcNm,
    ordrAplcEmail,
    agncLeaderNm,
    agncLeaderEmail,
    agncLeaderUkey,
    isSpecial,
    agncInfoDetail,
    agncLeaderInfoDetail,
  } = data;

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>거래처(PI)</TH>
            <TD sx={{ width: "35%" }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <Box>[{agncId}]</Box>
                    <Box>
                      {agncNm} ({instNm})
                    </Box>
                    {isSpecial === "Y" && (
                      <MyIcon
                        icon="vip-fill"
                        width={15}
                        data-tag="allowRowEvents"
                        color="#FFAB33"
                      />
                    )}
                  </Stack>
                </Grid>
                <Grid item>
                  <AgncDetailInfo agncUkey={agncUkey} />
                </Grid>
              </Grid>
            </TD>
            <TH sx={{ width: "15%" }}>연구책임자</TH>
            <TD sx={{ width: "35%" }}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  {agncLeaderNm} ({agncLeaderEmail})
                </Grid>
                <Grid item>
                  <RearchDetailInfo agncLeaderUkey={agncLeaderUkey} />
                </Grid>
              </Grid>
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>신청인</TH>
            <TD sx={{ width: "35%" }}>
              {ordrAplcNm} ({ordrAplcEmail})
            </TD>
            <TH sx={{ width: "15%" }}>연락처</TH>
            <TD sx={{ width: "35%" }}>{ordrAplctel}</TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable1;
