import React, { useCallback, useEffect, useState } from "react";
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
  ErrorContainer,
  Fallback,
  InputEAType,
  InputPriceType,
  OutlinedButton,
  TD,
  TH,
} from "cjbsDSTM";
import dynamic from "next/dynamic";
import MyIcon from "icon/MyIcon";
import { NumericFormat } from "react-number-format";
import SupplyPrice from "./SupplyPrice";

const LazyServiceCategorySelectbox = dynamic(
  () => import("../../../../../components/ServiceCategorySelectbox"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="body2" color="secondary">
        Loading...
      </Typography>
    ),
  },
);

const LazyAnlsTypeSelectbox = dynamic(
  () => import("../../../../../components/AnlsTypeSelectbox"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="body2" color="secondary">
        Loading...
      </Typography>
    ),
  },
);

const LazyProductName = dynamic(() => import("./ProductName"), {
  ssr: false,
  loading: () => (
    <Typography variant="body2" color="secondary">
      Loading...
    </Typography>
  ),
});

const DynamicTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invcProductDetailList",
  });
  const paymentInfoValue = watch("pymtInfoCc");
  const watchFieldArray = watch("invcProductDetailList");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const handleAppend = () => {
    append({
      srvcCtgrMc: "BS_0100005001",
      anlsTypeMc: "",
      products: "",
      qnty: 0,
      unitPrice: 0,
      supplyPrice: 0,
    });
  };

  const toggleRowSelection = (index, isChecked) => {
    if (isChecked) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    }
  };

  const toggleSelectAll = (isChecked) => {
    console.log("isChecked", isChecked);
    if (isChecked) {
      setSelectedRows(fields.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const handleDeleteSelected = () => {
    const rowsToDelete = [...selectedRows].sort((a, b) => b - a);
    rowsToDelete.forEach((index) => remove(index));
    setSelectedRows([]);
  };

  return (
    <>
      <Typography variant="subtitle1">
        품명(총 {controlledFields.length}건)
      </Typography>
      <TableContainer sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {paymentInfoValue !== "BS_1914004" && (
                <TH sx={{ width: 50 }} align="center">
                  <Checkbox
                    checked={
                      fields.length > 0 && selectedRows.length === fields.length
                    }
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                  />
                </TH>
              )}
              <TH sx={{ width: 250 }}>서비스 분류</TH>
              <TH sx={{ width: 250 }}>분석 종류</TH>
              <TH>품명</TH>
              <TH sx={{ width: 150 }} align="right">
                수량
              </TH>
              <TH sx={{ width: 200 }} align="right">
                단가
              </TH>
              <TH sx={{ width: 200 }} align="right">
                공급가액
              </TH>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlledFields.map((field, index) => {
              return (
                <TableRow>
                  {paymentInfoValue !== "BS_1914004" && (
                    <TD>
                      <Checkbox
                        checked={selectedRows.includes(index)}
                        onChange={(e) =>
                          toggleRowSelection(index, e.target.checked)
                        }
                      />
                    </TD>
                  )}
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyServiceCategorySelectbox
                        inputName={`invcProductDetailList[${index}].srvcCtgrMc`}
                      />
                    </ErrorContainer>
                  </TD>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyAnlsTypeSelectbox
                        inputName={`invcProductDetailList[${index}].anlsTypeMc`}
                      />
                    </ErrorContainer>
                  </TD>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyProductName
                        inputName={`invcProductDetailList[${index}].products`}
                        fieldName="invcProductDetailList"
                        control={control}
                        index={index}
                      />
                    </ErrorContainer>
                    {errors.detailList?.[index]?.products && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        품명을 입력 해주세요
                      </Typography>
                    )}
                  </TD>
                  <TD>
                    <Controller
                      name={`invcProductDetailList[${index}].qnty`}
                      control={control}
                      rules={{ required: "수량을 입력해야 합니다." }}
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
                          customInput={InputEAType}
                        />
                      )}
                    />
                  </TD>
                  <TD align="right">
                    <Controller
                      name={`invcProductDetailList[${index}].unitPrice`}
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
                  </TD>
                  <TD align="right">
                    <SupplyPrice
                      fieldName="invcProductDetailList"
                      index={index}
                      inputName={`invcProductDetailList[${index}].supplyPrice`}
                    />
                  </TD>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {paymentInfoValue !== "BS_1914004" && (
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          sx={{ mb: 3 }}
        >
          <ContainedButton
            buttonName="품명 추가"
            onClick={handleAppend}
            startIcon={<MyIcon icon="plus" size={18} color="white" />}
          />
          <OutlinedButton
            color="error"
            buttonName="삭제"
            onClick={handleDeleteSelected}
          />
        </Stack>
      )}
    </>
  );
};

export default DynamicTable;
