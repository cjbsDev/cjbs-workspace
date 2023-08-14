/**
 * 거래처(PI) 수정
 * 1. 해당 페이지 기능들 파악
 *  - 수정
 *    거래처명 : agncNm
 *    거래처 Ukey : agncUkey
 *    주소 : addr
 *    주소 자세히 : addrDetail
 *    우편 번호 : zip
 *    멤버 정보 : custDetail[]
 *    특별 관리 : isSpecialMng
 *    메모 : memo
 *
 */

"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next-nprogress-bar";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  SelectBox,
  CheckboxSV,
  TD,
  TH,
  Title1,
  PostCodeBtn,
} from "cjbsDSTM";
import SkeletonLoading from "../../../components/SkeletonLoading";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { PUT } from "api";
import { toast } from "react-toastify";

interface FormData {
  esPrMngUkey?: string;
  anlsTypeMc?: string;
  anlsTypeMcVal?: string;
  prNm?: string;
  inclInfo?: string;
  isUse?: string;
}

export default function AgncPIModifyPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("esPrMngUkey");
  const uKey = params;
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const methods = useForm<FormData>({
    defaultValues: () => {
      return fetch(`${process.env.NEXT_PUBLIC_API_URL}/mngr/esPrMng/${uKey}`)
        .then((res) => res.json())
        .then((getData) => {
          const data = getData.data;
          if (!data) {
            console.log("데이터가 없습니다. 메세지 보이고 페이지 이동");
            router.push("/agnc-pi-list");
            return;
          }

          setIsLoading(false);

          return {
            esPrMngUkey: data.esPrMngUkey,
            anlsTypeMc: data.anlsTypeMc,
            anlsTypeMcVal: data.anlsTypeMcVal,
            prNm: data.prNm,
            inclInfo: data.inclInfo,
            isUse: data.isUse,
          };
        });
    },
  });

  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  // [ 수정 ]
  const onSubmit = async (data: any) => {
    console.log("in onSubmit", data);
    //console.log("selectedMembers", selectedMembers);

    ///mngr/esPrMng/{esPrMngUkey}
    let saveObj = {
      inclInfo: data.inclInfo,
      isUse: data.isUse,
      prNm: data.prNm,
    };
    console.log("==modify", saveObj);
    console.log("modify stringify", JSON.stringify(saveObj));

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mngr/esPrMng/${uKey}`; // Replace with your API URL

    try {
      const response = await PUT(apiUrl, saveObj); // API 요청
      if (response.success) {
        router.push("/es-pr-list/" + uKey);
      } else if (response.code == "INVALID_AUTHORITY") {
        toast("권한이 없습니다.");
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box sx={{ mb: 4 }}>
            <Title1 titleName="견적 품명 수정" />
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 5 }}>
            기본 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>분석종류</TH>
                  <TD sx={{ width: "85%" }}>{getValues("anlsTypeMcVal")}</TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>품명</TH>

                  <TD sx={{ width: "85%" }}>
                    <InputValidation
                      inputName="prNm"
                      required={true}
                      sx={{ width: 600 }}
                    />
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>메모</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={10}
                      inputName="inclInfo"
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/es-pr-list/")}
            />
            <ContainedButton buttonName="수정" type="submit" />
          </Stack>
        </Box>
      </Container>
    </FormProvider>
  );
}
