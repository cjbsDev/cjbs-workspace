import React from "react";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { formatNumberWithCommas, TD, TH } from "cjbsDSTM";

interface OrderTable2Data {
  intnExtrClCc: string | null;
  prjtCodeMc: string;
  prjtCodeNm: string | null;
  prjtDetailCodeMc: string;
  prjtDetailCodeNm: string | null;
  prjtDetailCode: string;
  mailRcpnList: string[];
  mailRcpnListVal: string[];
  reqReturnList: string[];
  reqReturnListVal: string[];
  returnCompList: string[];
  returnCompListVal: string[];
  isAgncLeaderRcpn: string;
  isOrdrAplcRcpn: string;
  isEtcRcpn: string;
  addEmailList: string | null;
  isDnaReturn: string;
  isSampleReturn: string;
  isDnaReturnComp: string;
  isSampleReturnComp: string;
  is16S: string;
  check16sAt: string | null;
  price: number;
}

interface OrderTable2Props {
  data: OrderTable2Data;
}

const OrderTable2 = ({ data }: OrderTable2Props) => {
  const {
    intnExtrClCc,
    prjtCodeMc,
    prjtCodeNm,
    prjtDetailCodeMc,
    prjtDetailCodeNm,
    prjtDetailCode,
    mailRcpnList,
    mailRcpnListVal,
    reqReturnList,
    reqReturnListVal,
    returnCompList,
    returnCompListVal,
    isAgncLeaderRcpn,
    isOrdrAplcRcpn,
    isEtcRcpn,
    addEmailList,
    isDnaReturn,
    isSampleReturn,
    isDnaReturnComp,
    isSampleReturnComp,
    is16S,
    check16sAt,
    price,
  } = data;
  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow
            sx={{ display: prjtCodeNm === null ? "none" : "table-row" }}
          >
            <TH sx={{ width: "15%" }}>과제명</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              {prjtCodeNm}
            </TD>
          </TableRow>
          <TableRow
            sx={{
              display: prjtDetailCodeNm === null ? "none" : "table-row",
            }}
          >
            <TH sx={{ width: "15%" }}>연구명</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              {prjtDetailCodeNm}
            </TD>
          </TableRow>

          <TableRow>
            <TH sx={{ width: "15%" }}>메일 수신 설정</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              {mailRcpnListVal.length === 0 ? "-" : mailRcpnListVal.toString()}{" "}
              ({addEmailList !== null && addEmailList})
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>반송 요청</TH>
            <TD sx={{ width: "35%" }}>
              {reqReturnListVal.length === 0
                ? "-"
                : reqReturnListVal.toString()}
            </TD>
            <TH sx={{ width: "15%" }}>반송 완료 여부</TH>
            <TD sx={{ width: "35%" }}>
              {returnCompListVal.length === 0
                ? "-"
                : returnCompListVal.toString()}
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>16S 확인 요청</TH>
            <TD sx={{ width: "35%" }}>{is16S === "Y" ? "확인요청(Y)" : "-"}</TD>
            <TH sx={{ width: "15%" }}>16S 확인일</TH>
            <TD sx={{ width: "35%" }}>
              {check16sAt === null ? "-" : check16sAt}
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>오더 금액</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              <Stack direction="row" spacing={0.5}>
                <Typography variant="body2">
                  {formatNumberWithCommas(price)}
                </Typography>
                <Typography variant="body2">원</Typography>
              </Stack>
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable2;
