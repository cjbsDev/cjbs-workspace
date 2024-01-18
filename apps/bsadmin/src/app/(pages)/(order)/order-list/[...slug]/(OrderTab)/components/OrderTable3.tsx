import React from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TD, TH } from "cjbsDSTM";

interface OrderTable3Data {
  prepMngrId: string | null;
  prepMngrNm: string | null;
  libMngrId: string | null;
  libMngrNm: string | null;
  seqMngrId: string | null;
  seqMngrNm: string | null;
  anlsMngrId: string | null;
  anlsMngrNm: string | null;
  prjtMngrId: string | null;
  prjcMngrNm: string | null;
  bsnsMngrId: string | null;
  bsnsMngrNm: string | null;
  orderCreatorId: string | null;
  orderCreatorNm: string | null;
}

interface OrderTable3Props {
  data: OrderTable3Data;
}

const OrderTable3 = ({ data }: OrderTable3Props) => {
  const {
    prepMngrId,
    prepMngrNm,
    libMngrId,
    libMngrNm,
    seqMngrId,
    seqMngrNm,
    anlsMngrId,
    anlsMngrNm,
    prjtMngrId,
    prjcMngrNm,
    bsnsMngrId,
    bsnsMngrNm,
    orderCreatorId,
    orderCreatorNm,
  } = data;

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>실험 담당자</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              <Stack direction="row" spacing={0.5}>
                <Box>{prepMngrNm === null ? "-" : prepMngrNm}(Prep),</Box>
                <Box>{libMngrNm === null ? "-" : libMngrNm}(Lip),</Box>
                <Box>{seqMngrNm === null ? "-" : seqMngrNm}(Seq)</Box>
              </Stack>
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>분석 담당자</TH>
            <TD sx={{ width: "35%" }}>
              {anlsMngrNm === null ? "-" : anlsMngrNm}
            </TD>
            <TH sx={{ width: "15%" }}>과제 담당자</TH>
            <TD sx={{ width: "35%" }}>
              {prjcMngrNm === null ? "-" : prjcMngrNm}
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>영업 담당자</TH>
            <TD sx={{ width: "35%" }}>
              {bsnsMngrNm === null ? "-" : bsnsMngrNm}
            </TD>
            <TH sx={{ width: "15%" }}>오더 등록자</TH>
            <TD sx={{ width: "35%" }}>
              {orderCreatorNm === null ? "-" : orderCreatorNm}
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable3;
