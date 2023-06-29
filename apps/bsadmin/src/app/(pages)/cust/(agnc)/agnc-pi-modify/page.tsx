"use client";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  MenuItem,
  NativeSelect,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import LogUpdateTitle from "../../../../components/LogUpdateTitle";
import {
  ContainedButton,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Title1,
  PostCodeBtn,
} from "cjbsDSTM";
import * as React from "react";
import SkeletonLoading from "../../../../components/SkeletonLoading";
import { useForm, FormProvider } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const LazyAgncModifyLog = dynamic(
  () => import("../../../../components/LogTable"),
  {
    ssr: false,
    loading: () => <SkeletonLoading height={272} />,
  }
);
interface FormData {
  agncNm?: string;
  agncUkey?: string;
  custNm?: string;
  isAcs?: boolean;
  memo?: string;
  tel_0?: string;
  tel_1?: string;
  tel_2?: string;
  telList?: string[];
}
export default function AgncPIModifyPage() {
  const searchParams = useSearchParams();
  const params = searchParams.get("agncUkey");
  const uKey = params;
  const router = useRouter();

  console.log("Ukey", params);

  const methods = useForm<FormData>({
    defaultValues: async () => {
      const res = await fetch(
        `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/agnc/${uKey}`
      );
      const getData = await res.json();
      const data = getData.data;
      console.log("modity data", data);

      return {
        instNm: data.instNm,
        agncNm: data.agncNm,
        zip: data.zip,
        addr: data.addr,
        addrDetail: data.addrDetail,
        memo: data.memo,
        category: "A",
        isSpecialMng: [data.isSpecialMng],
      };
    },
  });
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    handleSubmit,
  } = methods;

  const onSubmit = (data: any) => {
    console.log("in onSubmit", data);
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
            <Title1 titleName="거래처(PI) 수정" />
          </Box>

          <Typography variant="subtitle1" sx={{ mt: 5 }}>
            기본 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>기관명</TH>
                  <TD sx={{ width: "85%" }}>
                    <InputValidation
                      // error={errors.instNm ? true : false}
                      // helperText={errors.instNm?.message ?? null}
                      register={register}
                      inputName="instNm"
                      errorMessage={false}
                      disabled={true}
                    />
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)명</TH>

                  <TD sx={{ width: "85%" }}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        error={errors.agncNm ? true : false}
                        helperText={errors.agncNm?.message ?? null}
                        register={register}
                        inputName="agncNm"
                        errorMessage={
                          errors.agncNm
                            ? "중복된 거래처명이 있습니다."
                            : "거래처(PI)를 입력해 주세요."
                        }
                      />

                      <input
                        {...register("isSpecialMng")}
                        type="checkbox"
                        value="Y"
                        id="SpecialMng"
                      />
                      <label htmlFor="SpecialMng">
                        특별 관리(SP)하는 거래처 입니다
                      </label>

                      <NativeSelect
                        variant={"outlined"}
                        sx={{
                          border: "none",
                          ".MuiNativeSelect-outlined": {
                            // backgroundColor: "red",
                            border: "1px solid blue",
                          },
                        }}
                        {...register("category")}
                      >
                        <option value="">Select...</option>
                        <option value="A">Category A</option>
                        <option value="B">Category B</option>
                      </NativeSelect>
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>주소 [선택]</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          disabled={true}
                          register={register}
                          inputName="zip"
                          errorMessage={false}
                          placeholder="zip code"
                        />
                        <PostCodeBtn />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          disabled={true}
                          sx={{ width: 450 }}
                          register={register}
                          inputName="addr"
                          errorMessage={false}
                        />
                      </Stack>
                      <Stack direction="row" spacing={0.5}>
                        <InputValidation
                          sx={{ width: 450 }}
                          register={register}
                          inputName="addrDetail"
                          errorMessage={false}
                          placeholder="상세주소"
                        />
                      </Stack>
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/cust/agnc-pi-list")}
            />
            <ContainedButton buttonName="저장" type="submit" />
          </Stack>
        </Box>

        <Box sx={{ mb: 5 }}>
          <LogUpdateTitle logTitle="거래처(PI)" />
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyAgncModifyLog apiName="agnc" uKey={uKey} />
          </ErrorContainer>
        </Box>
      </Container>
    </FormProvider>
  );
}
