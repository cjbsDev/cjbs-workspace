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
import fetcher from "../../../func/fetcher";

interface CustEBCInfoProps {
  slug: string;
  ebcShow: boolean;
}

const CustEBCInfo: React.FC<CustEBCInfoProps> = ({ slug, ebcShow }) => {
  const [selected, setSelected] = useState(ebcShow);

  const { data: custEBCTemp } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/ebc/${slug}`,
    fetcher,
    { suspense: true }
  );

  const custEBCData = custEBCTemp.data;

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
          height: selected ? "58px" : "fit-content",
          overflowY: "hidden",
          mb: 5,
        }}
      >
        {/* <Table  sx={{ tableLayout: "fixed" }}> */}
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>고객번호</TH>
              <TD colSpan={5} sx={{ width: "85%" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* <LeaderCip /> */}
                  <Box>{custEBCData.ebcUid}</Box>
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>아이디</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcEmail ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>서브 이메일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcSubEmail ?? "-"}
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
            <TableRow>
              <TH sx={{ width: "15%" }}>academic</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcIsSchl ?? "-"}
              </TD>
              <TH sx={{ width: "15%" }}>가입일</TH>
              <TD sx={{ width: "35%" }} colSpan={2}>
                {custEBCData.ebcJoinedAt ? custEBCData.ebcJoinedAt : "-"}
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CustEBCInfo;
