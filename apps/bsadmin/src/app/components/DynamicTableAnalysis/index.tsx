import React, { useEffect, useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import {
  Button,
  Checkbox,
  IconButton,
  Stack,
  styled,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  DeletedButton,
  ErrorContainer,
  Fallback,
  InputEAType,
  InputPriceType,
  InputValidation,
  LinkButton,
  OutlinedButton,
  TD,
  TH,
} from "cjbsDSTM";
import dynamic from "next/dynamic";
import MyIcon from "icon/MyIcon";
import { NumericFormat } from "react-number-format";
import SupplyPrice from "./components/SupplyPrice";
import DeleteBtn from "../../(pages)/(ledger)/(invc)/ledger-tax-invoice-list/components/DeleteBtn";
import InputPrice from "../../(pages)/(ledger)/(invc)/ledger-tax-invoice-reg/components/InputPrice";
import StndPrice from "./components/StndPrice";
import StndDscntPctg from "./components/StndDscntPctg";
import Vat from "./components/Vat";
import SampleSize from "./components/SampleSize";
import { QuestionTooltip } from "../QuestionTooltip";
import { useRecoilState, useRecoilValue } from "recoil";
import { analysisAtom } from "../NewAnalysisListModal/analysisAtom";

const LazyAnalysisListModal = dynamic(
  () => import("../../components/NewAnalysisListModal"),
  {
    ssr: false,
  },
);

const LazyServiceTypeSelectbox = dynamic(
  () => import("./components/ServiceTypeSelectbox"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="body2" color="secondary">
        Loading...
      </Typography>
    ),
  },
);

const LazyDscntRasnSelectbox = dynamic(() => import("./components/DscntRasn"), {
  ssr: false,
  loading: () => (
    <Typography variant="body2" color="secondary">
      Loading...
    </Typography>
  ),
});

// const LazyProductName = dynamic(() => import("./ProductName"), {
//   ssr: false,
//   loading: () => (
//     <Typography variant="body2" color="secondary">
//       Loading...
//     </Typography>
//   ),
// });

const DynamicTableAnalysis = ({}) => {
  const getSelectedSampleList = useRecoilValue(analysisAtom);
  const [showAnalysisSearchModal, setShowAnalysisSearchModal] =
    useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    getValues,
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const getOrderUkey = getValues("orderUkey");
  console.log("getOrderUkey", getOrderUkey);
  const fieldArrayName = "costList";

  const { fields, append, update, replace, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });
  // const paymentInfoValue = watch("pymtInfoCc");
  const watchFieldArray = watch(fieldArrayName);
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  useEffect(() => {
    // if () {}
    console.log("Hmmmmmm!", controlledFields);
    controlledFields.map((index) => remove(index));
  }, [getOrderUkey]);

  const handleAppend = () => {
    append({
      // srvcTypeMc: "BS_0100007001",
      // anlsTypeMc: "",
      // products: "",
      // sampleSize: 0,
      // unitPrice: 0,
      // supplyPrice: 0,
      // stndPrice: "0",
      // dscntPctg: 0,
      addType: null,
      dscntPctg: "",
      dscntRasnCc: "",
      dscntRasnDetail: "",
      isExc: "",
      sampleSize: 0,
      sampleUkey: [],
      srvcTypeMc: "",
      stndCode: "",
      stndPrice: "0",
      supplyPrice: 0,
      unitPrice: 0,
      vat: 0,

      // srvcTypeMc: "",
      // sampleSize: 0,
      // unitPrice: 0,
      // supplyPrice: 0,
      // vat: 0,
      // dscntRasnCc: "",
      // dscntRasnDetail: "",
      // stndPrice: "0",
      // stndCode: "",
      // isExc: "N",
    });
  };

  const toggleRowSelection = (index: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    }
  };

  const toggleSelectAll = (isChecked: boolean) => {
    console.log("isChecked", isChecked);
    if (isChecked) {
      setSelectedRows(fields.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const isDeleteDisabled = selectedRows.length === 0;
  const handleDeleteSelected = () => {
    const rowsToDelete = [...selectedRows].sort((a, b) => b - a);
    rowsToDelete.forEach((index) => remove(index));
    setSelectedRows([]);
  };

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#f5f5f9",
      color: "rgba(0, 0, 0, 0.87)",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: "1px solid #dadde9",
    },
  }));

  const analysisSearchModalOpen = () => {
    setShowAnalysisSearchModal(true);
  };
  const analysisSearchModalClose = () => {
    setShowAnalysisSearchModal(false);
  };

  if (controlledFields.length === 0) {
    return (
      <>
        <Stack
          spacing={1}
          justifyContent="center"
          alignItems="center"
          sx={{
            border: `1px solid ${cjbsTheme.palette.grey.A400}`,
            mb: 3,
          }}
        >
          <Stack
            spacing={1}
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <LinkButton
              buttonName="해당 영역을 클릭하면 선택한 주문의 서비스 유형별 분석 정보를 가져올 수 있습니다."
              sx={{ width: "100%", height: "100px" }}
              onClick={analysisSearchModalOpen}
            />
          </Stack>
        </Stack>

        {/* 분석내역 검색 모달*/}
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyAnalysisListModal
            onClose={analysisSearchModalClose}
            // handleSelectedRowChange={handleSelectedRowChange}
            // handleAddSampleList={handleAddSampleList}
            open={showAnalysisSearchModal}
            // getOrderUkey={ukeyValue}
            // selectSampleList={selectSampleList}
            append={append}
            // update={update}
            replace={replace}
            // remove={remove}
            modalWidth={1400}
          />
        </ErrorContainer>
      </>
    );
  }

  return (
    <>
      <Typography variant="subtitle1">
        분석내역(총 {fields.length}건)
      </Typography>
      <TableContainer sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TH align="center" sx={{ width: 50 }}>
                <Checkbox
                  size="small"
                  checked={
                    fields.length > 0 && selectedRows.length === fields.length
                  }
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </TH>

              <TH align="center">서비스 타입</TH>
              <TH sx={{ width: 180 }} align="center">
                기준가
              </TH>
              {/*<TH>품명</TH>*/}
              <TH sx={{ width: 150 }} align="center">
                수량
              </TH>
              <TH sx={{ width: 150 }} align="center">
                단가
              </TH>
              <TH sx={{ width: 240 }} align="center">
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={0.5}
                >
                  <Typography variant="body2">공급가액</Typography>
                  <HtmlTooltip
                    title={
                      <>
                        <Stack
                          direction="column"
                          justifyContent="center"
                          alignItems="flex-start"
                          spacing={1}
                          // sx={{ width: 500 }}
                        >
                          <Typography variant="subtitle2">안내</Typography>
                          <Typography variant="body2">
                            공급가액은 원래 공급가액에서
                          </Typography>
                          <Typography variant="body2">
                            ± 10원 범위 내에서만 수정 가능합니다.
                          </Typography>
                        </Stack>
                      </>
                    }
                    placement="top"
                  >
                    <IconButton>
                      <MyIcon icon="exclamation-circle" size={20} />
                    </IconButton>
                  </HtmlTooltip>
                </Stack>
              </TH>
              <TH sx={{ width: 120 }} align="center">
                부가세
              </TH>
              <TH sx={{ width: 120 }} align="center">
                사용할인율
              </TH>
              <TH align="center">사유</TH>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlledFields.map((field, index) => {
              return (
                <TableRow key={field.id || index}>
                  <TD align="center">
                    <Checkbox
                      size="small"
                      checked={selectedRows.includes(index)}
                      onChange={(e) =>
                        toggleRowSelection(index, e.target.checked)
                      }
                    />
                  </TD>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyServiceTypeSelectbox
                        inputName={`${fieldArrayName}[${index}].srvcTypeMc`}
                        fieldArrayName={fieldArrayName}
                        index={index}
                      />
                      {/*<LazyServiceCategorySelectbox*/}
                      {/*  inputName={`${fieldArrayName}[${index}].srvcTypeMc`}*/}
                      {/*  index={index}*/}
                      {/*/>*/}
                    </ErrorContainer>
                    {errors.costList?.[index]?.srvcTypeMc && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        서비스 분류를 선택해 주세요
                      </Typography>
                    )}
                  </TD>
                  <TD>
                    {/*<InputPrice inputName={`sample[${index}].stndPrice`} />*/}
                    <StndPrice fieldName={fieldArrayName} index={index} />
                  </TD>
                  <TD>
                    <SampleSize fieldName={fieldArrayName} index={index} />
                    {/*<Controller*/}
                    {/*  name={`${fieldArrayName}[${index}].sampleSize`}*/}
                    {/*  control={control}*/}
                    {/*  rules={{ required: "수량을 입력해야 합니다." }}*/}
                    {/*  render={({*/}
                    {/*    field: { onChange, onBlur, value },*/}
                    {/*    fieldState: { error },*/}
                    {/*  }) => (*/}
                    {/*    <NumericFormat*/}
                    {/*      defaultValue={0}*/}
                    {/*      value={value}*/}
                    {/*      thousandSeparator={true}*/}
                    {/*      onValueChange={(values) => {*/}
                    {/*        onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리*/}
                    {/*      }}*/}
                    {/*      onBlur={() => console.log("BBBBBBBB")}*/}
                    {/*      customInput={InputEAType}*/}
                    {/*    />*/}
                    {/*  )}*/}
                    {/*/>*/}
                    {/*{errors.costList?.[index]?.sampleSize && (*/}
                    {/*  <Typography*/}
                    {/*    variant="body2"*/}
                    {/*    color={cjbsTheme.palette.warning.main}*/}
                    {/*  >*/}
                    {/*    수량을 입력 해주세요*/}
                    {/*  </Typography>*/}
                    {/*)}*/}
                  </TD>
                  <TD align="right">
                    <Controller
                      name={`${fieldArrayName}[${index}].unitPrice`}
                      control={control}
                      rules={{ required: "단가를 입력해야 합니다." }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <NumericFormat
                          defaultValue={0}
                          value={value}
                          thousandSeparator={true}
                          onValueChange={(values) => {
                            onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
                          }}
                          customInput={InputPriceType}
                        />
                      )}
                    />
                    {errors.costList?.[index]?.unitPrice && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        단가를 입력 해주세요
                      </Typography>
                    )}
                  </TD>
                  <TD align="right">
                    <SupplyPrice
                      fieldName={fieldArrayName}
                      index={index}
                      inputName={`${fieldArrayName}[${index}].supplyPrice`}
                    />
                  </TD>
                  <TD>
                    <Vat fieldName={fieldArrayName} index={index} />
                  </TD>
                  <TD>
                    <StndDscntPctg fieldName={fieldArrayName} index={index} />
                  </TD>
                  <TD>
                    <LazyDscntRasnSelectbox index={index} />
                  </TD>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
        <ContainedButton
          size="small"
          buttonName="서비스 타입 추가"
          onClick={handleAppend}
          startIcon={<MyIcon icon="plus" size={18} color="white" />}
        />
        <ContainedButton
          size="small"
          buttonName="분석 비용 추가"
          onClick={analysisSearchModalOpen}
        />
        <DeletedButton
          buttonName="삭제"
          disabled={isDeleteDisabled}
          onClick={handleDeleteSelected}
          startIcon={
            <MyIcon
              icon="trash"
              size={18}
              color={
                isDeleteDisabled
                  ? cjbsTheme.palette.grey["400"]
                  : cjbsTheme.palette.error.main
              }
            />
          }
        />
      </Stack>

      {/* 분석내역 검색 모달*/}
      <ErrorContainer FallbackComponent={Fallback}>
        <LazyAnalysisListModal
          onClose={analysisSearchModalClose}
          // handleSelectedRowChange={handleSelectedRowChange}
          // handleAddSampleList={handleAddSampleList}
          open={showAnalysisSearchModal}
          // getOrderUkey={ukeyValue}
          // selectSampleList={selectSampleList}
          append={append}
          // update={update}
          replace={replace}
          // remove={remove}
          modalWidth={1400}
        />
      </ErrorContainer>
    </>
  );
};

export default DynamicTableAnalysis;
