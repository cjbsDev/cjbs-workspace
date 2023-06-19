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
  RHFInputDefaultType,
  cjbsTheme,
  LeaderCip,
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
  IconButton,
  ToggleButton,
  DialogContent,
  Button,
} from "@mui/material";

import useSWR from "swr";
import axios from "axios";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MyIcon from "icon/myIcon";

import { useForm } from "react-hook-form";
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
  isAcs: string;
  memo: string;
  tel1: string;
}

export default function CustModifyPage({ params }: paramsProps) {
  const { slug } = params;

  const [formData, setFormData] = useState<FormData>({
    agncNm: "",
    custNm: "",
    isAcs: "",
    memo: "",
    tel1: "",
  });
  const { handleSubmit, control, setValue } = useForm();
  const [selected, setSelected] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: custTemp, error: custError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/detail/${slug}`,
    fetcher
  );
  const { data: custEBCTemp, error: custEBCError } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list/ebc/${slug}`,
    fetcher
  );

  if (!custTemp || !custEBCTemp) {
    return <div>Loading...</div>;
  }
  if (custError || custEBCError) {
    return <div>Error...</div>;
  }

  const custData = custTemp.data;
  const custEBCData = custEBCTemp.data;

  console.log("11110 custData", custData);
  //console.log("yes01");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <FormContainer
        defaultValues={{
          agncNm: custData.agncNm,
          custNm: custData.custNm,
          isAcs: custData.isAcs == "Y" ? ["true"] : [],
          tel1: custData.tel1,
          memo: custData.memo,
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="고객 정보 수정" />
        </Box>

        <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="subtitle1">EzBioCloud 가입 정보</Typography>

          <CustomToggleButton
            value="접기"
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
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>고객번호</TH>
                <TD colSpan={5} sx={{ width: "85%" }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box>{custEBCData.ebcUid} </Box>
                    <Chip
                      icon={
                        <MyIcon
                          icon="profile-circle-fill"
                          size={18}
                          color={cjbsTheme.palette.primary.main}
                        />
                      }
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
                      buttonName="거래처 검색"
                      onClick={handleClickOpen}
                    />

                    <ContainedButton buttonName="거래처 변경" />
                    <OutlinedButton buttonName="삭제" color="error" />
                  </Stack>
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>연락처 [선택]</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TextFieldElement
                      name="tel1"
                      size="small"
                      sx={{
                        ".MuiTextField-root": {
                          p: 0,
                        },
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{ border: "1px solid #cccccc", borderRadius: "2" }}
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton sx={{ display: "none" }}>
                      <RemoveIcon />
                    </IconButton>
                  </Stack>
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>거래처(PI)</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TextFieldElement
                      name="custPI"
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
                    {/* 
                    <CheckboxButtonGroup
                      labelProps={{ sx: { color: "red", mr: 1 } }}
                      name="isAcs"
                      options={[
                        {
                          id: "custBlock",
                          label: "사용자를 차단 합니다.",
                        },
                      ]}
                    />
                    */}
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

        <Typography variant="subtitle1">고객정보 수정 로그</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          고객정보 수정 로그는 최근 1년간 데이터만 표시되며, 1년이 지난 로그는
          자동으로 삭제됩니다.
        </Typography>
        <Box sx={{ mb: 5 }}>
          {/* 
          <LazyCustModifyLog />
          */}
        </Box>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push("cust-list")}
          />
          <ContainedButton type="submit" buttonName="저장" />
        </Stack>
      </FormContainer>

      <Typography variant="subtitle1" sx={{ mt: 5 }}>
        고객정보 수정 로그
      </Typography>
      <Typography variant="body2" sx={{ mb: 1 }}>
        고객정보 수정 로그는 최근 1년간 데이터만 표시되며, 1년이 지난 로그는
        자동으로 삭제됩니다.
      </Typography>
      <Box sx={{ mb: 5 }}>
        <LazyCustModifyLog />
      </Box>

      <ModalContainer onClose={handleClose} open={open} modalWidth={800}>
        <ModalTitle onClose={handleClose}>거래처(PI)</ModalTitle>
        <DialogContent>blablablablasblablaabl</DialogContent>
      </ModalContainer>
    </Container>
  );
}
