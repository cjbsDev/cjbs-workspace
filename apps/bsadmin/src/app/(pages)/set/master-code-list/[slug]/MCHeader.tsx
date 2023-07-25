"use client";

import React from "react";
import { TH, TD } from "cjbsDSTM";
import useSWR from "swr";
import axios from "axios";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Container,
} from "@mui/material";
import SkeletonLoading from "../../../../components/SkeletonLoading";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface MCHeaderProps {
  slug: string;
}

const MCHeader: React.FC<MCHeaderProps> = ({ slug }) => {
  // load
  const {
    data: msCodeTempData,
    error,
    isLoading,
  } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/mngr/masterCode/${slug}`,
    fetcher
  );
  if (isLoading) {
    return <SkeletonLoading />;
  }

  const msCodeData = msCodeTempData.data;

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
              <TH sx={{ width: "15%" }}>마스터코드 명(국문)</TH>

              <TD sx={{ width: "35%" }} colSpan={2}>
                {msCodeData.codeNm ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>마스터코드 명(영문)</TH>
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
