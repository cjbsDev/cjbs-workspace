import React from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD, TH } from "cjbsDSTM";
import { fetcher } from "api";
import useSWR from "swr";

interface RearchDetailInfoTableProps {
  ukey: string;
}

const RearchDetailInfoTable = ({ ukey }: RearchDetailInfoTableProps) => {
  const { data } = useSWR(`/cust/list/detail/${ukey}`, fetcher, {
    suspense: true,
  });
  console.log("RearchDetailInfoTable", data);

  const {
    custUkey,
    custNm,
    telList,
    agncUkey,
    agncNm,
    instNm,
    memo,
    modifiedAt,
    ebcId,
    ebcEmail,
    nm,
  } = data;
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "35%" }}>고객 번호</TH>
            <TD>{ebcId}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>아이디</TH>
            <TD>{ebcEmail}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>이름</TH>
            <TD>{nm}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>연락처</TH>
            <TD>{telList === null ? "-" : telList}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>거래처(PI)</TH>
            <TD>
              {agncNm}({instNm})
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RearchDetailInfoTable;
