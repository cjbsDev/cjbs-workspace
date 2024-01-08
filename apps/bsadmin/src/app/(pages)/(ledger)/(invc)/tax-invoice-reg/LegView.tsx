"use client";

import React, { useCallback, useState } from "react";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  Form,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
} from "cjbsDSTM";
import {
  Box,
  BoxProps,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";
import LoadingSvg from "public/svg/loading_wh.svg";
import AgncSearchModal from "../../../../components/AgncSearchModal";
import AgncAndInstName from "./components/AgncAndInstName";
import NGSSalesManagerSelectbox from "../../../../components/NGSSalesManagerSelectbox";
import InstSearchModal from "../../../../components/InstSearchModal";
import BusinessRegNo from "./components/BusinessRegNo";
import RepresentName from "./components/RepresentName";
import DynamicTable from "./components/DynamicTable";
import DynamicSumTable from "./components/DynamicSumTable";
import { POST } from "api";
import PaymentDynamicInfo from "./components/PaymentDynamicInfo";
import dayjs from "dayjs";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { agncModalShowAtom, instModalShowAtom } from "./atom";
import PblshrInst from "./components/PblshrInst";

const LegView = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [showAgncSearchModal, setShowAgncSearchModal] =
  //   useState<boolean>(false);
  // const [showInstSearchModal, setShowInstSearchModal] =
  //   useState<boolean>(false);
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useRecoilState(agncModalShowAtom);
  const [showInstSearchModal, setShowInstSearchModal] =
    useRecoilState(instModalShowAtom);

  const defaultValues = {
    pymtInfoCc: "BS_1914001",
    invcProductDetailList: [
      {
        srvcCtgrMc: "BS_0100005001",
        anlsTypeMc: "",
        products: "",
        qnty: 0,
        unitPrice: 0,
        supplyPrice: 0,
      },
    ],
  };

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    console.log("Form Data ==>>", data);
    const {
      invcProductDetailList,
      agncUkey,
      bsnsMngrUkey,
      pymtInfoCc,
      instUkey,
      pymtMngrNm,
      rcvEmail,
      memo,
      report,
      vat,
      totalPrice,
      totalSupplyPrice,
      // dpstDttm,
      dpstPrice,
      pyrNm,
      tnsfTargetAgncUkey,
    } = data;

    const dpstDttm = dayjs(data.dpstDttm).format("YYYY-MM-DD");

    const bodyData = {
      agncUkey,
      bsnsMngrUkey,
      dpstDttm,
      dpstPrice,
      pyrNm,
      instUkey,
      invcProductDetailList,
      memo,
      pymtInfoCc,
      pymtMngrNm,
      rcvEmail,
      report,
      tnsfTargetAgncUkey,
      totalPrice,
      totalSupplyPrice,
      vat,
    };

    try {
      const res = await POST(`/invc`, bodyData);
      console.log("Response", res);
      if (res.success) {
        router.push("/tax-invoice-list");
      } else {
        toast(res.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 거래처 검색 모달
  const handleAgncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };
  const handleAgncSearchModalClose = useCallback(() => {
    setShowAgncSearchModal(false);
  }, []);

  // 기관 검색 모달
  const handleInstSearchModalOpen = () => {
    setShowInstSearchModal(true);
  };
  const handleInstSearchModalClose = useCallback(() => {
    setShowInstSearchModal(false);
  }, []);

  return (
    <Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <Box sx={{ mb: 4 }}>
        <Title1 titleName="세금계산서 등록" />
      </Box>

      <Typography variant="subtitle1">기본정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>거래처(PI)</TH>
              <TD sx={{ width: "85%" }}>
                <Stack direction="row" spacing={0.2} alignItems="center">
                  <AgncAndInstName />
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="agncNm"
                    required={true}
                    // errorMessage="거래처를 입력해 주세요"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  {/*<InputValidation*/}
                  {/*  sx={{ display: "none" }}*/}
                  {/*  inputName="instNm"*/}
                  {/*  required={true}*/}
                  {/*  // errorMessage="기관을 입력해 주세요"*/}
                  {/*  InputProps={{*/}
                  {/*    readOnly: true,*/}
                  {/*  }}*/}
                  {/*/>*/}
                  <InputValidation
                    sx={{ display: "none" }}
                    inputName="agncUkey"
                    required={true}
                    // errorMessage="키값 입력하세요."
                    InputProps={{
                      readOnly: true,
                      hidden: true,
                    }}
                  />
                  <OutlinedButton
                    size="small"
                    buttonName="거래처 검색"
                    onClick={handleAgncSearchModalOpen}
                  />
                </Stack>
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>영업담당자</TH>
              <TD sx={{ width: "85%" }}>
                <ErrorContainer FallbackComponent={Fallback}>
                  <NGSSalesManagerSelectbox />
                </ErrorContainer>
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* 결제정보 */}
      <PaymentDynamicInfo />

      {/* 품명 */}
      <DynamicTable />
      <DynamicSumTable />

      {/* 발행처 정보 */}
      <PblshrInst />

      <Typography variant="subtitle1">기타정보</Typography>
      <TableContainer sx={{ mb: 5 }}>
        <Table>
          <TableBody>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                메모<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "85%" }}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="memo"
                  placeholder="메모"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
            <TableRow>
              <TH sx={{ width: "15%" }}>
                보고서<NotRequired>[선택]</NotRequired>
              </TH>
              <TD sx={{ width: "85%" }}>
                <InputValidation
                  fullWidth={true}
                  multiline
                  rows={4}
                  inputName="report"
                  placeholder="보고서"
                  maxLength={500}
                  maxLengthErrMsg="500자리 이내로 입력해주세요. ( 만약 더 많은 글자 사용해야된다면 알려주세요.)"
                />
              </TD>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Link href="/tax-invoice-list">
          <OutlinedButton size="small" buttonName="목록" />
        </Link>

        <ContainedButton
          size="small"
          type="submit"
          buttonName="저장"
          endIcon={
            isLoading ? (
              <LoadingSvg stroke="white" width={20} height={20} />
            ) : null
          }
        />
      </Stack>

      <AgncSearchModal
        onClose={handleAgncSearchModalClose}
        open={showAgncSearchModal}
        modalWidth={800}
      />

      <InstSearchModal
        onClose={handleInstSearchModalClose}
        open={showInstSearchModal}
        modalWidth={1000}
      />
    </Form>
  );
};

export default LegView;
const NotRequired = styled(Box)<BoxProps>(({ theme }) => ({
  color: "#666666",
  display: "inline-block",
  marginLeft: 5,
}));
