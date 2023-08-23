import React from "react";
import { Table, TableBody, TableContainer, TableRow } from "@mui/material";
import { TD, TH, transformedNullToHyphon } from "cjbsDSTM";

const SampleInfoTable1 = ({ sampleInfoData }: any) => {
  const transformedData = transformedNullToHyphon(sampleInfoData);
  const {
    sampleId,
    sampleNm,
    altrNm,
    runList,
    sampleStatusCc,
    sampleStatusVal,
    source,
    depth,
    taxonCc,
    taxonVal,
    prgrAgncNmCc,
    prgrAgncNmVal,
    mcNmCc,
    mcNmVal,
    isVrfc,
    anlsInstId,
    memo,
    sampleStatusRes,
  }: any = transformedData;

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>샘플번호</TH>
            <TD sx={{ width: "35%" }}>{sampleId}</TD>
            <TH sx={{ width: "15%" }}>RUN</TH>
            <TD sx={{ width: "35%" }}>{runList}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>샘플명</TH>
            <TD sx={{ width: "35%" }}>{sampleNm}</TD>
            <TH sx={{ width: "15%" }}>대체명</TH>
            <TD sx={{ width: "35%" }}>{altrNm}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>샘플종류</TH>
            <TD sx={{ width: "35%" }}>{sampleId}</TD>
            <TH sx={{ width: "15%" }}>Source</TH>
            <TD sx={{ width: "35%" }}>{source}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>Depth(GB)</TH>
            <TD sx={{ width: "35%" }}>{depth}</TD>
            <TH sx={{ width: "15%" }}>Taxon</TH>
            <TD sx={{ width: "35%" }}>{taxonVal}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>진행업체</TH>
            <TD sx={{ width: "35%" }}>{prgrAgncNmVal}</TD>
            <TH sx={{ width: "15%" }}>장비</TH>
            <TD sx={{ width: "35%" }}>{mcNmVal}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>검증여부</TH>
            <TD sx={{ width: "35%" }}>{isVrfc}</TD>
            <TH sx={{ width: "15%" }}>내역서</TH>
            <TD sx={{ width: "35%" }}>{anlsInstId}</TD>
          </TableRow>

          <TableRow>
            <TH sx={{ width: "15%" }}>메모</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              {memo}
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SampleInfoTable1;
