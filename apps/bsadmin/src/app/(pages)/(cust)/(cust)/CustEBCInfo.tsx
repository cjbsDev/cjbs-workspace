"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { CustomToggleButton, TH, TD, LeaderCip } from "cjbsDSTM";
import useSWR from "swr";
import {
  Stack,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Box,
} from "@mui/material";
import { fetcher } from "api";

interface CustEBCInfoProps {
  slug: string;
  ebcShow: boolean;
}

const CustEBCInfo: React.FC<CustEBCInfoProps> = ({ slug, ebcShow }) => {
  const [selected, setSelected] = useState(ebcShow);

  const { data: custEBCData } = useSWR(`/cust/list/ebc/${slug}`, fetcher, {
    suspense: true,
  });

  const handleToggle = () => {
    setSelected(!selected);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="subtitle1">EzBioCloud 가입 정보</Typography>

        <CustomToggleButton
          value={selected ? "펼치기" : "접기"}
          selected={selected}
          onChange={handleToggle}
        />
      </Stack>

      <TableContainer
        sx={{
          height: selected ? "42px" : "fit-content",
          overflowY: "hidden",
          mb: 5,
        }}
      >
        {/* <Table  sx={{ tableLayout: "fixed" }}> */}
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>고객번호</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                <Box>{custEBCData.ebcUid ?? "-"}</Box>
              </TD>
              <TH sx={{ width: "15%" }}>아이디</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcEmail ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>서브 이메일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcSubEmail ?? "-"}
              </TD>

              <TH sx={{ width: "15%" }}>academic</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcIsSchl ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>영문 이름</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcFullName ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>호칭</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcTitle ?? "-"}
              </TD>
            </TableRow>

            <TableRow>
              <TH sx={{ width: "15%" }}>국가</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcNtly ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>소속 단체</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcInstNm ?? "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustEBCInfo;
