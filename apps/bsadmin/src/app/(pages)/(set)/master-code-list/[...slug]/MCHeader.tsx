"use client";

import React from "react";
import { TH, TD } from "cjbsDSTM";
import useSWR from "swr";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { fetcher } from "api";
import { useParams } from "next/navigation";

const MCHeader = () => {
  const params = useParams();
  const { slug } = params;
  const { data: msCodeData } = useSWR(`/mngr/masterCode/${slug}`, fetcher, {
    suspense: true,
  });

  return (
    <>
      {/* 마스터 코드 - 상세 코드 컴포넌트 */}
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>마스터 코드</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                {msCodeData.uniqueCode ?? ""}
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>마스터 코드 명(국문)</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {msCodeData.codeNm ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>마스터 코드 명(영문)</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {msCodeData.codeValue ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MCHeader;
