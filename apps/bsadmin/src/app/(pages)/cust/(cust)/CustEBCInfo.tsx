"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  ContainedButton,
  OutlinedButton,
  CustomToggleButton,
  Title1,
  TH,
  TD,
  ModalContainer,
  ModalTitle,
  cjbsTheme,
} from "cjbsDSTM";
import useSWR from "swr";
import axios from "axios";
import {
  Chip,
  Stack,
  Grid,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";
import MyIcon from "icon/myIcon";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface CustEBCInfoProps {
  slug: string;
  ebcShow: boolean;
}

const CustEBCInfo: React.FC<CustEBCInfoProps> = ({ slug, ebcShow }) => {
  const [selected, setSelected] = useState(ebcShow);

  const { data: custEBCTemp, error: custEBCError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/ebc/${slug}`,
    fetcher
  );

  useEffect(() => {
    if (custEBCError) {
      console.log("custEBCError", custEBCError);
    }
  }, [custEBCError]);

  if (custEBCError) {
    return <div>Error...</div>;
  }

  if (!custEBCTemp) {
    return <div>Cust EBC Info Loading...</div>;
  }

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
                  {custEBCData.ebcUid}{" "}
                  <Chip
                    icon={<MyIcon icon="customer" size={25} color="red" />}
                    label={"Leader"}
                    size="small"
                    sx={{
                      backgroundColor: "#E6F0FA",
                      color: "#006ECD",
                    }}
                  />
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
