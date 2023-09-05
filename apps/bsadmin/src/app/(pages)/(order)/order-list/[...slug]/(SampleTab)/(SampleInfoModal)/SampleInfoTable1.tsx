import React from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ErrorContainer,
  Fallback,
  InputValidation,
  SelectBox,
  TD,
  TH,
  transformedNullToHyphon,
} from "cjbsDSTM";
import dynamic from "next/dynamic";
import { vrfcData } from "../../../../../../data/inputDataLists";

const LazyHostCompSelctbox = dynamic(
  () => import("../../../../../../components/HostCompSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazySampleCategorySelctbox = dynamic(
  () => import("../../../../../../components/SampleCategorySelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazyTaxonTypeSelctbox = dynamic(
  () => import("../../../../../../components/TaxonTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazyMcNmSelctbox = dynamic(
  () => import("../../../../../../components/McNmSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const LazyDepthSelctbox = dynamic(
  () => import("../../../../../../components/DepthSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

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
    depthMc,
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

  console.log("rrrrr", sampleNm);

  return (
    <TableContainer sx={{ mb: 5 }}>
      <Table>
        <TableBody>
          <TableRow>
            <TH sx={{ width: "15%" }}>샘플번호</TH>
            <TD sx={{ width: "35%" }}>{sampleId}</TD>
            <TH sx={{ width: "15%" }}>RUN</TH>
            <TD sx={{ width: "35%" }}>{runList.join(", ")}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>샘플명</TH>
            <TD sx={{ width: "35%" }}>
              <InputValidation inputName="sampleNm" />
            </TD>
            <TH sx={{ width: "15%" }}>대체명</TH>
            <TD sx={{ width: "35%" }}>{altrNm}</TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>샘플종류</TH>
            <TD sx={{ width: "35%" }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazySampleCategorySelctbox />
              </ErrorContainer>
            </TD>
            <TH sx={{ width: "15%" }}>Source</TH>
            <TD sx={{ width: "35%" }}>
              {/*{source}*/}
              <InputValidation
                inputName="source"
                // sx={{ width: 400 }}
              />
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>Depth(GB)</TH>
            <TD sx={{ width: "35%" }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyDepthSelctbox />
              </ErrorContainer>
            </TD>
            <TH sx={{ width: "15%" }}>Taxon</TH>
            <TD sx={{ width: "35%" }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyTaxonTypeSelctbox />
              </ErrorContainer>
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>진행업체</TH>
            <TD sx={{ width: "35%" }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyHostCompSelctbox />
              </ErrorContainer>
            </TD>
            <TH sx={{ width: "15%" }}>장비</TH>
            <TD sx={{ width: "35%" }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyMcNmSelctbox />
              </ErrorContainer>
            </TD>
          </TableRow>
          <TableRow>
            <TH sx={{ width: "15%" }}>검증여부</TH>
            <TD sx={{ width: "35%" }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <SelectBox
                  inputName="isVrfc"
                  options={vrfcData}
                  sx={{ width: "100%" }}
                />
              </ErrorContainer>
            </TD>
            <TH sx={{ width: "15%" }}>내역서</TH>
            <TD sx={{ width: "35%" }}>{anlsInstId}</TD>
          </TableRow>

          <TableRow>
            <TH sx={{ width: "15%" }}>메모</TH>
            <TD sx={{ width: "85%" }} colSpan={3}>
              <InputValidation
                fullWidth={true}
                multiline
                rows={3}
                inputName="memo"
                placeholder="메모"
                maxLength={500}
                maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
              />
            </TD>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SampleInfoTable1;
