import React from "react";
import {
  ContainedButton,
  formatBusinessRegNo,
  ModalAction,
  ModalContainer,
  ModalTitle,
  TD,
  TH,
  transformedNullToHyphon,
} from "cjbsDSTM";
import {
  DialogContent,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";
import useSWR from "swr";
import { fetcher } from "api";
import { useSearchParams } from "next/navigation";

interface AgncInfo {
  addr: string;
  addrDetail: string;
  zip: string;
  brno: string;
  douzoneCode: string;
  instNm: string;
  rprsNm: string;
  itbsns: string;
  tpbsns: string;
  ftr: string;
  statusCodeVal: string;
  instTypeCc: string;
  instTypeVal: string;
  instUniqueCodeMc: string;
  lctnTypeCc: string;
  lctnTypeVal: string;
  region1Gc: string;
  region1Val: string;
  region2Gc: string;
  region2Val: string;
  statusCodeCc: string;
}

interface TransformedAgncInfo {
  addr: string;
  addrDetail: string;
  zip: string;
  brno: string;
  douzoneCode: string;
  instNm: string;
  rprsNm: string;
  itbsns: string;
  tpbsns: string;
  ftr: string;
  statusCodeVal: string;
  instTypeCc: string;
  instTypeVal: string;
  instUniqueCodeMc: string;
  lctnTypeCc: string;
  lctnTypeVal: string;
  region1Gc: string;
  region1Val: string;
  region2Gc: string;
  region2Val: string;
  statusCodeCc: string;
}

const AgncInfoModal = ({ open, onClose, modalWidth }: ModalContainerProps) => {
  const searchParams = useSearchParams();
  const instUkey = searchParams.get("instUkey");
  const { data } = useSWR<AgncInfo>(`/inst/${instUkey}`, fetcher, {
    suspense: true,
  });

  console.log("기관 정보 ==>>", data);

  const transformedData = transformedNullToHyphon(data || {});

  const {
    addr,
    addrDetail,
    brno,
    douzoneCode,
    ftr,
    instNm,
    instTypeCc,
    instTypeVal,
    instUniqueCodeMc,
    itbsns,
    lctnTypeCc,
    lctnTypeVal,
    region1Gc,
    region1Val,
    region2Gc,
    region2Val,
    rprsNm,
    statusCodeCc,
    statusCodeVal,
    tpbsns,
    zip,
  }: TransformedAgncInfo = transformedData;

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>기관 검색</ModalTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "35%" }}>더존 코드</TH>
                <TD>{douzoneCode}</TD>
              </TableRow>
              <TableRow>
                <TH>기관명</TH>
                <TD>{instNm}</TD>
              </TableRow>
              <TableRow>
                <TH>사업자 등록번호</TH>
                <TD>{formatBusinessRegNo(brno)}</TD>
              </TableRow>
              <TableRow>
                <TH>대표자</TH>
                <TD>{rprsNm}</TD>
              </TableRow>
              <TableRow>
                <TH>업태</TH>
                <TD>{itbsns}</TD>
              </TableRow>
              <TableRow>
                <TH>업종</TH>
                <TD>{tpbsns}</TD>
              </TableRow>
              <TableRow>
                <TH>주소</TH>
                <TD>
                  <Stack spacing={0.5}>
                    <Typography variant="body2">[{zip}]</Typography>
                    <Typography variant="body2">{addr}</Typography>
                    <Typography variant="body2">{addrDetail}</Typography>
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH>분류</TH>
                <TD>{instTypeVal}</TD>
              </TableRow>
              <TableRow>
                <TH>지역</TH>
                <TD>
                  <Stack direction="row" spacing={0.5}>
                    <Typography variant="body2">{region1Val}</Typography>
                    <Typography variant="body2">{region2Val}</Typography>
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH>특성</TH>
                <TD>{ftr}</TD>
              </TableRow>
              <TableRow>
                <TH>상태</TH>
                <TD>{statusCodeVal}</TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <ModalAction>
        <ContainedButton buttonName="닫기" onClick={onClose} />
      </ModalAction>
    </ModalContainer>
  );
};

export default AgncInfoModal;
