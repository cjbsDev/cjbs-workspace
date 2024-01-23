import React from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD, TH } from "cjbsDSTM";
import { fetcher } from "api";
import useSWR from "swr";

interface AgncDetailInfoTableProps {
  ukey: string;
}

const AgncDetailInfoTable = ({ ukey }: AgncDetailInfoTableProps) => {
  const { data } = useSWR(`/agnc/${ukey}`, fetcher, {
    suspense: true,
  });
  console.log("AgncDetailInfoTable", data);
  const {
    agncId,
    agncUkey,
    isSpecialMng,
    agncNm,
    instNm,
    zip,
    addr,
    addrDetail,
    ebcEmail,
    custNm,
    custUkey,
    custDetail,
    prePymtPrice,
    bsnsMngrNm,
    bsnsMngrUkey,
    memo,
  } = data;
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "35%" }}>거래처 번호</TH>
            <TD>{agncId}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>거래처(PI)</TH>
            <TD>
              {agncNm}({instNm})
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>연구책임자 아이디</TH>
            <TD>{ebcEmail}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>연구책임자 이름</TH>
            <TD>{custNm}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "35%" }}>주소</TH>
            <TD>{addrDetail}</TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AgncDetailInfoTable;
