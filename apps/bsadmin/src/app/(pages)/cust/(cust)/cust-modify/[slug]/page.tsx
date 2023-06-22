"use client";
import { useState, useEffect, useCallback, ChangeEvent } from "react";
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
  InputValidation,
} from "cjbsDSTM";

import {
  Box,
  Chip,
  Container,
  Stack,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  DialogContent,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import useSWR from "swr";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MyIcon from "icon/myIcon";

import { useForm, FormProvider } from "react-hook-form";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as React from "react";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import CustEBCInfo from "../../CustEBCInfo";

const LazyCustModifyLog = dynamic(() => import("./CustModifyLog"), {
  ssr: false,
  loading: () => <SkeletonLoading height={272} />,
});

const LazyAgncSearchModal = dynamic(() => import("./AgncSearchModal"), {
  ssr: false,
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface paramsProps {
  params: {
    slug: string;
  };
}

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

interface IData {
  data: FormData;
}

export default function CustModifyPage({ params }: paramsProps) {
  // init
  const { slug } = params;

  /*
  const methods = useForm<FormData>();
  */

  const methods = useForm();
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = methods;

  const [checked, setChecked] = useState(false); // 체크 박스 테스트
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [showAgncSearchModal, setShowAgncSearchModal] =
    useState<boolean>(false);

  // load
  const { data: custData } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`,
    fetcher
  );
  /*
  const custData = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`,
    fetcher,
    {
      suspense: true,
    }
  );
  */

  useEffect(() => {
    if (custData) {
      display(custData);
    }
  }, [custData]);

  // display
  const display = (custData: IData) => {
    const displayData = custData.data;
    console.log("display start", displayData);
    const telList = displayData.telList || [];
    //custNm, tel_0, tel_1, tel_2, agncNm, isAcs, memo
    setValue("custNm", displayData.custNm);
    setValue("tel_0", telList[0] ?? "");
    setValue("tel_1", telList[1] ?? "");
    setValue("tel_2", telList[2] ?? "");
    setValue("agncNm", displayData.agncNm);
    setValue("agncUkey", displayData.agncUkey);
    setValue("memo", displayData.memo);
  };

  // event
  const handleDelBtn = () => {
    setValue("agncUkey", "");
    setValue("agncNm", "");
    console.log("삭제");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: any) => {
    console.log("in onSubmit");

    // validation 체크
    let telList = [getValues("tel_0"), getValues("tel_1"), getValues("tel_2")];
    let agncUkey = getValues("agncUkey");
    let custNm = getValues("custNm");
    let memo = getValues("memo");

    let saveObj = {
      agncUkey,
      custNm,
      telList,
      memo,
      isAcs: "Y",
    };
    console.log("==saveObj", saveObj);

    const apiUrl = `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`; // Replace with your API URL

    axios
      .put(apiUrl, saveObj)
      .then((response) => {
        console.log("PUT request successful:", response.data);
        if (response.data.success) {
          router.push("/cust/cust-list/" + slug);
        }
      })
      .catch((error) => {
        console.error("PUT request failed:", error);
      });
  };

  const agncSearchModalOpen = () => {
    setShowAgncSearchModal(true);
  };

  const agncSearchModalClose = () => {
    setShowAgncSearchModal(false);
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth={false} sx={{ width: "100%" }}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Box sx={{ mb: 4 }}>
            <Title1 titleName="고객 정보 수정" />
          </Box>

          <CustEBCInfo slug={slug} ebcShow={true} />

          <Typography variant="subtitle1" sx={{ mt: 5 }}>
            기본 정보
          </Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>이름</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <InputValidation
                        error={errors.custNm ? true : false}
                        helperText={
                          errors.custNm ? errors.custNm?.message : null
                        }
                        register={register}
                        inputName="custNm"
                        errorMessage="필수 값입니다."
                      />
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>연락처 [선택] </TH>

                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        error={errors.tel_0 ? true : false}
                        helperText={errors.tel_0 ? errors.tel_0?.message : null}
                        register={register}
                        inputName="tel_0"
                        errorMessage=""
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        error={errors.tel_1 ? true : false}
                        helperText={errors.tel_1 ? errors.tel_1?.message : null}
                        register={register}
                        inputName="tel_1"
                        errorMessage=""
                      />
                    </Stack>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      sx={{ mb: 1 }}
                      alignItems="center"
                    >
                      <InputValidation
                        error={errors.tel_2 ? true : false}
                        helperText={errors.tel_2 ? errors.tel_2?.message : null}
                        register={register}
                        inputName="tel_2"
                        errorMessage=""
                      />
                    </Stack>
                  </TD>
                </TableRow>
                <TableRow>
                  <TH sx={{ width: "15%" }}>거래처(PI)</TH>

                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack
                      direction="row"
                      spacing={0.5}
                      alignItems="flex-start"
                    >
                      <InputValidation
                        disabled={true}
                        error={errors.agncNm ? true : false}
                        helperText={errors.agncNm?.message ?? null}
                        register={register}
                        inputName="agncNm"
                        errorMessage="필수 값입니다."
                      />

                      <InputValidation
                        disabled={true}
                        sx={{ display: "none" }}
                        register={register}
                        inputName="agncUkey"
                        error={errors.agncUkey ? true : false}
                        helperText={errors.agncUkey?.message ?? null}
                        errorMessage="필수 값입니다."
                      />

                      <OutlinedButton
                        size="small"
                        buttonName="검색"
                        onClick={agncSearchModalOpen}
                        //onClick={handleClickOpen}
                        // sx={{ backgroundColor: cjbsTheme.palette.secondary.main }}
                      />
                      <OutlinedButton
                        size="small"
                        buttonName="삭제"
                        color="error"
                        onClick={handleDelBtn}
                      />
                    </Stack>
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="subtitle1">운영 관리 정보</Typography>
          <TableContainer sx={{ mb: 5 }}>
            <Table>
              <TableBody>
                <TableRow>
                  <TH sx={{ width: "15%" }}>상태</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <FormControlLabel
                        sx={{ color: "red", mr: 1 }}
                        label="사용자를 차단 합니다."
                        control={
                          <Checkbox
                            checked={checked}
                            size="small"
                            {...register("isAcs")}
                          />
                        }
                      />
                      <Typography variant="body1">
                        (차단된 사용자는 주문서 작성 화면에 로그인 할 수
                        없습니다.)
                      </Typography>
                    </Stack>
                  </TD>
                </TableRow>

                <TableRow>
                  <TH sx={{ width: "15%" }}>메모</TH>
                  <TD sx={{ width: "85%" }} colSpan={5}>
                    <InputValidation
                      fullWidth={true}
                      multiline
                      rows={4}
                      register={register}
                      inputName="memo"
                      errorMessage={false}
                    />
                  </TD>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Stack direction="row" spacing={0.5} justifyContent="center">
            <OutlinedButton
              buttonName="목록"
              onClick={() => router.push("/cust/cust-list")}
            />
            <ContainedButton
              buttonName="저장"
              type="submit"
              //onClick={onSubmit}
              //onClick={handleSave}
            />
          </Stack>

          <Box sx={{ mb: 5 }}>
            <Typography variant="subtitle1" sx={{ mt: 5 }}>
              고객정보 수정 로그
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              고객정보 수정 로그는 최근 1년간 데이터만 표시되며, 1년이 지난
              로그는 자동으로 삭제됩니다.
            </Typography>

            <LazyCustModifyLog slug={slug} />
          </Box>

          {/* 거래처 검색 모달 */}
          {showAgncSearchModal && (
            <LazyAgncSearchModal
              onClose={agncSearchModalClose}
              open={showAgncSearchModal}
              modalWidth={800}
            />
          )}
        </Box>
      </Container>
    </FormProvider>
  );
}
