import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack, styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, ToggleButton, ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  cjbsTheme, ConfirmModal,
  ContainedButton,
  InputValidation, OutlinedButton,
  SelectBox,
  UnStyledButton,
} from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import MyIcon from "icon/MyIcon";
import axios from "axios";
import ExRow from "./ExRow";
import TableHeader from "./TableHeader";
import TableNewRows from "./TableNewRows";
import ExcelUploadModal from "./ExcelUploadModal";
import LoadingSvg from "@public/svg/loading_wh.svg";
import Link from "next/link";


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0),
    border: "1px solid #CED4DA",
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
      border: "1px solid #CED4DA",
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
      border: "1px solid #CED4DA",
    },
  },
}));

const OrderWgComparativeDynamicTable = (props) => {
  // console.log("$$$$$$$$$$", props.serviceType);
  const {sampleFields} = props;
  const { watch, control, getValues, formState,setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "cmprGenomeAnlsDetailList", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [isCmprGenomeAnls, setIsCmprGenomeAnls] = useState<string>("N");
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);
  const [groupOptionData, setGroupOptionData] = useState([]);

  const handleAlertOpen = () => {
    setAlertModalOpen(true);
  };
  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const handleServiceTypeChange = () => {
    resetGroupTable();
    sampleFields.map((field, index) => {
      const getData = getValues(`sample.[${index}].sampleNm`);
      console.log(getData);
      append({
        sampleNm: getData,
      });
    });
    handleAlertClose();
  };

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment === null) return;
    if (newAlignment === 'N') {
      resetGroupTable()
    }
    setValue("isCmprGenomeAnls", newAlignment);
    setIsCmprGenomeAnls(newAlignment);
  };

  // group table delete
  const resetGroupTable = () => {
    console.log("fields : ", fields);
    fields.forEach((item) => {
      remove(item);
    });
  };

  // const handleAddFields = (count:any) => {
  //   console.log("Count~!~!", count);
  //   // 입력된 수만큼 항목을 추가합니다.
  //   for (let i = 0; i < count; i++) {
  //     append({
  //       // sampleNm: "",
  //       // groupNm: "",
  //       // source: "",
  //       // sampleCategoryCc: "",
  //       // memo: "",
  //       // selfQcResultFileId: 0
  //     });
  //   }
  // };

  return (
    <>

      <ConfirmModal
        alertBtnName="확인"
        alertMainFunc={handleServiceTypeChange}
        onClose={handleAlertClose}
        open={alertModalOpen}
        mainMessage={
          "샘플명 적용 시 비교 유전체분석(무료)이 초기화 됩니다.\n"
        }
        subMessage={"적용하시겠습니까?"}
      />

      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Typography variant="subtitle1">비교 유전체 분석 Comparative Genome analysis (무료)</Typography>
        <Stack direction="row" spacing={0.5} justifyContent="center" sx={{ mb: 3 }}>
          <ContainedButton
            buttonName="샘플명 적용"
            onClick={() => handleAlertOpen()}
          />
        </Stack>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 1, mb: 3, width: "100%" }}
      >
        <StyledToggleButtonGroup
          color="primary"
          value={isCmprGenomeAnls}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
          sx={{ width: "100%", justifyContent: "space-between" }}
        >
          <ToggleButton value="Y" sx={{ width: "49%" }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography variant="body2">균주 직접 선택</Typography>
            </Stack>
          </ToggleButton>
          <ToggleButton value="N" sx={{ width: "49%" }}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Typography variant="body2">임의 분석</Typography>
            </Stack>
          </ToggleButton>
        </StyledToggleButtonGroup>
      </Stack>

      <InputValidation inputName="isCmprGenomeAnls" sx={{width: "80px", display: 'none'}} defaultValue={isCmprGenomeAnls} />

      <Stack
        spacing={0}
        sx={{
          display: isCmprGenomeAnls === 'N' ? 'none' : '',
        }}
      >
        <Box
          alignItems="start"
          sx={{
            backgroundColor: cjbsTheme.palette.grey["50"],
            paddingX: 5,
            paddingY: 3,
            mb: 2,
          }}
        >
          <ul>
            <li>
              <Typography variant="body2">
                전장유전체분석(WG) 샘플당 1개 Set의 비교 유전체 분석 결과를 제공해드립니다.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                1개 Set에는 전장유전체분석 샘플을 포함하여 5개까지 구성이 가능합니다.
              </Typography>
            </li>
            <li>
              <Typography variant="body2">
                위 조건 이상의 분석은 info (02-6078-3456, bs.ngs@cj.net) 또는 영업담당자에게 문의 바랍니다
              </Typography>
            </li>
          </ul>
        </Box>

        <Typography variant="subtitle2" color={cjbsTheme.palette.primary.main}>
          Set에 포함되는 genome 조건
        </Typography>

        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          sx={{
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: cjbsTheme.palette.grey["400"],
            paddingX: 5,
            paddingY: 3,
            mb: 2,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="h4" color={cjbsTheme.palette.primary.main} sx={{lineHeight: 1.3}}>1</Typography>
            <Stack
              justifyContent="space-between"
              alignItems="start"
              spacing={0.2}
              sx={{ width: 300 }}
            >
              <Link
                href="https://www.ezbiocloud.net/genome/list?tn=Root"
                target="_blank"
              >
                <Typography variant="body2" color={cjbsTheme.palette.primary.main}>EzBioCloud public genome</Typography>
              </Link>
              <Typography variant="body2">1. EzBioCloud public genome database 에서 검색</Typography>
              <Typography variant="body2">2. Project(DB) Accession No. 기재</Typography>
            </Stack>
          </Stack>

          <MyIcon icon="cheveron-right" size={24} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="h4" color={cjbsTheme.palette.primary.main} sx={{lineHeight: 1.3}}>2</Typography>
            <Stack
              justifyContent="space-between"
              alignItems="start"
              spacing={0.2}
              sx={{ width: 300 }}
            >
              <Typography variant="body2">당사 서비스로 분석된 genome 주문서의</Typography>
              <Typography variant="body2">Taxonomy 란에 샘플명을 비고 란에</Typography>
              <Typography variant="body2">오더번호 등 관련 정보를 기입</Typography>
            </Stack>
          </Stack>

          <MyIcon icon="cheveron-right" size={24} />

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={2}
          >
            <Typography variant="h4" color={cjbsTheme.palette.primary.main} sx={{lineHeight: 1.3}}>3</Typography>
            <Stack
              justifyContent="space-between"
              alignItems="start"
              spacing={0.2}
              sx={{ width: 300 }}
            >
              <Typography variant="body2">그 외의 경우</Typography>
              <Typography variant="body2">EzBioCloud 파이프라인 분석을 진행 후</Typography>
              <Typography variant="body2">비교 유전체 분석이 가능 (서비스비용 청구)</Typography>
            </Stack>
          </Stack>

        </Stack>

        {/*<Stack direction="row" spacing={1} justifyContent="end">*/}
        {/*  <InputValidation*/}
        {/*    inputName="countGroup"*/}
        {/*    type="number"*/}
        {/*    sx={{width: "80px"}}*/}
        {/*  />*/}
        {/*  <ContainedButton*/}
        {/*    buttonName="행 추가"*/}
        {/*    size="small"*/}
        {/*    color={"secondary"}*/}
        {/*    onClick={() => handleAddFields(getValues("countGroup"))}*/}
        {/*  />*/}
        {/*</Stack>*/}
        <TableContainer sx={{ mb: 5, mt: 1, borderTop: "1px solid #000" }}>
          <Table>
            <TableHeader serviceType={'comparative'} />
            <TableBody>
              {/*<ExRow serviceType={'group'} />*/}
              {fields.map((field, index) => {
                return (
                  <TableNewRows
                    key={field.id}
                    field={field}
                    remove={remove}
                    index={index}
                    errors={errors}
                    serviceType={'comparative'}
                    groupOptionData={groupOptionData}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
};

export default OrderWgComparativeDynamicTable;
