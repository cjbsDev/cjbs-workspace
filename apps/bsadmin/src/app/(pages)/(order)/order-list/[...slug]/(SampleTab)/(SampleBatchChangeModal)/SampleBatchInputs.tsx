import React, { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import {
  ErrorContainer,
  Fallback,
  InputValidation,
  SelectBox,
  TD,
  TH,
} from "cjbsDSTM";
import {
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { vrfcData } from "../../../../../../data/inputDataLists";
import dynamic from "next/dynamic";

const LazySampleCategorySelctbox = dynamic(
  () => import("../../../../../../components/SampleCategorySelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyTaxonTypeSelctbox = dynamic(
  () => import("../../../../../../components/TaxonTypeSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyHostCompSelctbox = dynamic(
  () => import("../../../../../../components/HostCompSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyDepthSelctbox = dynamic(
  () => import("../../../../../../components/DepthSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);
const LazyMcNmSelctbox = dynamic(
  () => import("../../../../../../components/McNmSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  },
);

const SampleBatchInputs = ({ sampleUkeyList }) => {
  const sampleCount = sampleUkeyList.length;
  const { watch } = useFormContext();
  const getNm = watch("categoryNm");
  const changeContentList = watch("changeContentList") || "";
  const watchCntntLst = (changeContentList.match(/\n/g) || []).length;

  const textareaRef = useRef(null);

  // useEffect(() => {
  //   if (sampleCount === watchCntntLst && textareaRef.current) {
  //     watch("changeContentList");
  //   }
  // }, [sampleCount, watchCntntLst]);

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="subtitle2">
          변경 내용
          {/*{sampleCount}개 가능*/}
        </Typography>

        {sampleCount < watchCntntLst + 1 && (
          <Typography variant="body2" color="red">
            {sampleCount}줄까지만 입력 가능 합니다.
          </Typography>
        )}
      </Stack>

      {getNm === "etc" ? (
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TH>샘플 종류</TH>
                <TD colSpan={3}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazySampleCategorySelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "20%" }}>Taxon</TH>
                <TD sx={{ width: "30%" }}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyTaxonTypeSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH>진행업체</TH>
                <TD colSpan={3}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyHostCompSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH>장비</TH>
                <TD colSpan={3}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyMcNmSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH>검증</TH>
                <TD colSpan={3}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <SelectBox
                      inputName="isVrfc"
                      options={vrfcData}
                      sx={{ width: "100%" }}
                    />
                  </ErrorContainer>
                </TD>
              </TableRow>
              <TableRow>
                <TH>Depth(GB)</TH>
                <TD colSpan={3}>
                  <ErrorContainer FallbackComponent={Fallback}>
                    <LazyDepthSelctbox />
                  </ErrorContainer>
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <InputValidation
            fullWidth={true}
            multiline
            rows={13}
            inputName="changeContentList"
            placeholder={`숫자, 영어, 하이픈만 입력 가능 합니다.\n이곳에 변경할 내용을 1줄씩 입력 하거나\n엑셀이나 워드에 입력된 데이터를 복사하여 붙여 넣기 해주세요.`}
            // sx={{ minHeight: 313 }}
            required={true}
            errorMessage="변경할 내용을 입력해 주세요."
            // maxLength={500}
            // maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
          />
        </>
      )}
    </>
  );
};

export default SampleBatchInputs;
