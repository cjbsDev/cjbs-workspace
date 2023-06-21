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

import useSWR from "swr";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MyIcon from "icon/myIcon";

import { useForm, SubmitHandler } from "react-hook-form";
import {
  FormContainer,
  TextFieldElement,
  RadioButtonGroup,
  TextareaAutosizeElement,
  CheckboxButtonGroup,
  CheckboxElement,
} from "react-hook-form-mui";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as React from "react";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import CustEBCInfo from "../../CustEBCInfo";

const LazyCustModifyLog = dynamic(() => import("./CustModifyLog"), {
  ssr: false,
  loading: () => <SkeletonLoading height={272} />,
});

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

interface paramsProps {
  params: {
    slug: string;
  };
}

interface FormData {
  agncNm: string;
  custNm: string;
  isAcs: string[];
  memo: string;
  tel_0: string;
  tel_1: string;
  tel_2: string;
}

export default function CustModifyPage({ params }: paramsProps) {
  const { slug } = params;

  /*
  const [formData, setFormData] = useState<FormData>({
    agncNm: "",
    custNm: "",
    isAcs: "",
    memo: "",
    telList: [],
  });
  */
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormData>();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: custTemp, error: custError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`,
    fetcher
  );

  if (!custTemp) {
    return <div>Loading...</div>;
  }
  if (custError) {
    return <div>Error...</div>;
  }

  const custData = custTemp.data;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /*
  const handleSave = () => {
    console.log("in handleSave");
    const values = getValues(); // Get all form field values
    console.log("values", values);

    const { memo, isAcs, tel_0, tel_1, tel_2 } = values;

    console.log("Memo:", memo);
    console.log("isAcs:", isAcs);
    console.log("tel_0:", tel_0);
    console.log("tel_1:", tel_1);
    console.log("tel_2:", tel_2);
  };
  */

  const onSubmit = (data: any) => {
    console.log("in onSubmit");
    console.log("in onSubmit", data);
    console.log("TextFieldElement value:", data.textField);
    console.log("TextareaAutosizeElement value:", data.textarea);
    console.log("CheckboxElement value:", data.checkbox);
  };

  //console.log("custData.telList[2]", custData.telList[2]);
  const { telList } = custData;
  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <FormContainer
        defaultValues={{
          agncNm: custData.agncNm,
          custNm: custData.custNm,
          isAcs: custData.isAcs == "Y" ? ["true"] : [],
          tel_0: telList[0] ?? "",
          tel_1: telList[1] ?? "",
          tel_2: telList[2] ?? "",
          memo: custData.memo,
        }}
        onSuccess={() => {}}
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
                  <TextFieldElement
                    name="custNm"
                    required
                    size="small"
                    value="aaa"
                    //onChange={handleInputChange}
                  />
                  {/*<RHFInputDefaultType name="rete" />*/}
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>연락처 [선택] </TH>

                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    key={"tel0"}
                    sx={{ mb: 1 }}
                  >
                    1.
                    <TextFieldElement
                      name="tel_0"
                      size="small"
                      sx={{
                        ".MuiTextField-root": {
                          p: 0,
                        },
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    key={"tel1"}
                    sx={{ mb: 1 }}
                  >
                    2.
                    <TextFieldElement
                      name="tel_1"
                      size="small"
                      sx={{
                        ".MuiTextField-root": {
                          p: 0,
                        },
                      }}
                    />
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={0.5}
                    alignItems="center"
                    key={"tel2"}
                  >
                    3.
                    <TextFieldElement
                      name="tel_2"
                      size="small"
                      sx={{
                        ".MuiTextField-root": {
                          p: 0,
                        },
                      }}
                    />
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TextFieldElement
                      name="agncNm"
                      required
                      size="small"
                      sx={{ width: 380 }}
                    />
                    <ContainedButton
                      size="small"
                      buttonName="검색"
                      onClick={handleClickOpen}
                      // sx={{ backgroundColor: cjbsTheme.palette.secondary.main }}
                      color="secondary"
                    />
                    <OutlinedButton
                      size="small"
                      buttonName="삭제"
                      color="error"
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
                  <Stack direction="row" alignItems="center">
                    <CheckboxElement
                      labelProps={{ sx: { color: "red", mr: 1 } }}
                      label="사용자를 차단 합니다."
                      name="isAcs"
                      value="true"
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
                  <TextareaAutosizeElement
                    name="memo"
                    fullWidth
                    rows={5}
                    sx={{ minHeight: 130 }}
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
            //type="submit"
            onClick={onSubmit}
            //onClick={handleSave}
          />
        </Stack>
      </FormContainer>

      <Box sx={{ mb: 5 }}>
        <Typography variant="subtitle1" sx={{ mt: 5 }}>
          고객정보 수정 로그
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          고객정보 수정 로그는 최근 1년간 데이터만 표시되며, 1년이 지난 로그는
          자동으로 삭제됩니다.
        </Typography>

        <LazyCustModifyLog slug={slug} />
      </Box>

      <ModalContainer onClose={handleClose} open={open} modalWidth={800}>
        <ModalTitle onClose={handleClose}>거래처(PI)</ModalTitle>
        <DialogContent>blablablablasblablaabl</DialogContent>
      </ModalContainer>
    </Container>
  );
}
