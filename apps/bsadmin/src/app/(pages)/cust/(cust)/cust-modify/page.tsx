"use client";
import {
  ContainedButton,
  OutlinedButton,
  Title1,
  TH,
  TD,
  ModalContainer,
  ModalTitle,
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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MyIcon from "icon/myIcon";
import {
  FormContainer,
  TextFieldElement,
  RadioButtonGroup,
  TextareaAutosizeElement,
  CheckboxButtonGroup,
} from "react-hook-form-mui";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useState } from "react";
import SkeletonLoading from "../../../../components/SkeletonLoading";

const LazyCustModifyLog = dynamic(() => import("./CustModifyLog"), {
  ssr: false,
  loading: () => <SkeletonLoading height={272} />,
});

export default function CustModifyPage() {
  const [selected, setSelected] = useState(true);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const [custContact, setCustContact] = useState([
  //   {
  //     id: 1,
  //     phoneNumber: "",
  //   },
  // ]);
  const router = useRouter();

  return (
    <Container maxWidth={false} sx={{ width: "100%" }}>
      <FormContainer
        defaultValues={{
          custName: "namenamename",
          custSelected: "2",
          custPhone: "01073783058",
          custPI: "[1000] 유재석 교수 연구실(강남세브란스병원)",
          custBlock: ["custBlock"],
          custMemo: "memomemomemomemomemomemomemomemomemo",
        }}
        onSuccess={(data) => console.log(data)}
      >
        <Box sx={{ mb: 4 }}>
          <Title1 titleName="고객 정보 수정" />
        </Box>

        <Typography variant="subtitle1">EzBioCloud 가입 정보</Typography>
        <TableContainer sx={{ height: selected ? 58 : "auto" }}>
          {/* <Table  sx={{ tableLayout: "fixed" }}> */}
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>고객번호</TH>
                <TD colSpan={5} sx={{ width: "85%" }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box>11112222</Box>
                    <Chip
                      icon={<MyIcon icon="customer" size={25} color="red" />}
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
                  hyungseok.seo@cj.net
                </TD>
                <TH sx={{ width: "15%" }}>서브 이메일</TH>
                <TD sx={{ width: "35%" }} colSpan={2}>
                  -
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>영문 이름</TH>
                <TD sx={{ width: "35%" }} colSpan={2}>
                  hyungseok seo
                </TD>
                <TH sx={{ width: "15%" }}>호칭</TH>
                <TD sx={{ width: "35%" }} colSpan={2}>
                  MR
                </TD>
              </TableRow>

              <TableRow>
                <TH sx={{ width: "15%" }}>국가</TH>
                <TD sx={{ width: "35%" }} colSpan={2}>
                  Korea
                </TD>
                <TH sx={{ width: "15%" }}>소속 단체</TH>
                <TD sx={{ width: "35%" }} colSpan={2}>
                  CJ Bioscience
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>academic</TH>
                <TD sx={{ width: "35%" }} colSpan={2}>
                  Y
                </TD>
                <TH sx={{ width: "15%" }}>가입일</TH>
                <TD sx={{ width: "35%" }} colSpan={2}>
                  2023-05-08 13:43:23
                </TD>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 5 }}
        >
          <ToggleButton
            sx={{
              backgroundColor: "transparent",
              border: "none",
              "&.MuiToggleButton-root": {
                color: "black",
                ":hover": {
                  backgroundColor: "transparent",
                },
              },
              "&.Mui-selected": {
                backgroundColor: "transparent",
                ":hover": {
                  backgroundColor: "transparent",
                },
              },
            }}
            value="check"
            size="small"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            펼처보기 {selected ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </ToggleButton>
        </Stack>

        <Typography variant="subtitle1">기본 정보</Typography>
        <TableContainer sx={{ mb: 5 }}>
          <Table>
            <TableBody>
              <TableRow>
                <TH sx={{ width: "15%" }}>이름</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <TextFieldElement name="custName" required size="small" />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>고객 구분</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <RadioButtonGroup
                    row
                    name="custSelected"
                    options={[
                      {
                        id: "1",
                        label: "내국인",
                      },
                      {
                        id: "2",
                        label: "외국인",
                      },
                    ]}
                  />
                </TD>
              </TableRow>
              <TableRow>
                <TH sx={{ width: "15%" }}>연락처 [선택]</TH>
                <TD sx={{ width: "85%" }} colSpan={5}>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <TextFieldElement
                      name="custPhone"
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
                      buttonName="거래처 검색"
                      onClick={handleClickOpen}
                    />

                    <ContainedButton buttonName="거래처 변경" />
                    <OutlinedButton buttonName="삭제" color="error" />
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
                    <CheckboxButtonGroup
                      labelProps={{ sx: { color: "red", mr: 1 } }}
                      name="custBlock"
                      options={[
                        {
                          id: "custBlock",
                          label: "사용자를 차단 합니다.",
                        },
                      ]}
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
                    name="custMemo"
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
          <LazyCustModifyLog />
        </Box>

        <Stack direction="row" spacing={0.5} justifyContent="center">
          <OutlinedButton
            buttonName="목록"
            onClick={() => router.push("cust/cust-list")}
          />
          <ContainedButton type="submit" buttonName="저장" />
        </Stack>
      </FormContainer>

      <ModalContainer onClose={handleClose} open={open} modalWidth={800}>
        <ModalTitle onClose={handleClose}>거래처(PI)</ModalTitle>
        <DialogContent>blablablablasblablaabl</DialogContent>
      </ModalContainer>
    </Container>
  );
}
