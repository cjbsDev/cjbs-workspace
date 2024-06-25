import React, { useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import {
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
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

const DynamicTableLiecense = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();

  const fieldArrayName = "costList";

  const { fields, append, remove } = useFieldArray({
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

  const handleAppend = () => {
    append({
      srvcTypeMc: "BS_0100007001",
      anlsTypeMc: "",
      products: "",
      sampleSize: 0,
      unitPrice: 0,
      supplyPrice: 0,
      stndPrice: "0",
      dscntPctg: 0,
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
                공급가액
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
    </>
  );
};

export default DynamicTableLiecense;
