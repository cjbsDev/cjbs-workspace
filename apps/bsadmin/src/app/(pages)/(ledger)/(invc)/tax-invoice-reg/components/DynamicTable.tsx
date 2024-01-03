import React, { useEffect, useState } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
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
  EA,
  ErrorContainer,
  Fallback,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
  Won,
} from "cjbsDSTM";
import dynamic from "next/dynamic";
import AmountFormat from "../../../../../components/NumberFormat/AmountFormat";
import MyIcon from "icon/MyIcon";

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
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "detailList",
  });

  const handleAppend = () => {
    append({
      srvcCtgrMc: "BS_0100005001",
      anlsTypeMc: "",
      qnty: 0,
      unitPrice: 0,
      supplyPrice: 0,
      products: "",
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
      <Typography variant="subtitle1">품명(총 {fields.length}건)</Typography>
      <TableContainer sx={{ mb: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TH sx={{ width: 50 }} align="center">
                <Checkbox
                  checked={
                    fields.length > 0 && selectedRows.length === fields.length
                  }
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </TH>
              <TH>서비스 분류</TH>
              <TH>분석 종류</TH>
              <TH>품명</TH>
              <TH sx={{ width: 150 }} align="right">
                수량
              </TH>
              <TH align="right">단가</TH>
              <TH align="right">공급가액</TH>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => {
              return (
                <TableRow>
                  <TD>
                    <Checkbox
                      checked={selectedRows.includes(index)}
                      onChange={(e) =>
                        toggleRowSelection(index, e.target.checked)
                      }
                    />
                  </TD>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyServiceCategorySelectbox
                        inputName={`detailList[${index}].srvcCtgrMc`}
                      />
                    </ErrorContainer>
                  </TD>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyAnlsTypeSelectbox
                        inputName={`detailList[${index}].anlsTypeMc`}
                      />
                    </ErrorContainer>
                  </TD>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyProductName
                        inputName={`detailList[${index}].products`}
                        fieldName="detailList"
                        control={control}
                        index={index}
                      />
                    </ErrorContainer>
                  </TD>
                  <TD>
                    <InputValidation
                      inputName={`detailList[${index}].qnty`}
                      required={true}
                      errorMessage="금액을 입력해 주세요."
                      sx={{
                        ".MuiOutlinedInput-input": {
                          textAlign: "end",
                        },
                      }}
                      inputMode="numeric"
                      InputProps={{
                        inputComponent: (props) => (
                          <AmountFormat
                            name={"price"}
                            priceValue={0}
                            {...props}
                          />
                        ),
                        endAdornment: <EA />,
                      }}
                    />
                  </TD>
                  <TD>
                    <InputValidation
                      inputName={`detailList[${index}].unitPrice`}
                      required={true}
                      errorMessage="단가를 입력해 주세요."
                      sx={{
                        ".MuiOutlinedInput-input": {
                          textAlign: "end",
                        },
                      }}
                      inputMode="numeric"
                      InputProps={{
                        inputComponent: (props) => (
                          <AmountFormat
                            name={"price"}
                            priceValue={0}
                            {...props}
                          />
                        ),
                        endAdornment: <Won />,
                      }}
                    />
                  </TD>
                  <TD>
                    <InputValidation
                      inputName={`detailList[${index}].supplyPrice`}
                      required={true}
                      errorMessage="공급가를 입력해 주세요."
                      sx={{
                        ".MuiOutlinedInput-input": {
                          textAlign: "end",
                        },
                      }}
                      inputMode="numeric"
                      InputProps={{
                        inputComponent: (props) => (
                          <AmountFormat
                            name={"price"}
                            priceValue={0}
                            {...props}
                          />
                        ),
                        endAdornment: <Won />,
                      }}
                    />
                  </TD>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 3 }}>
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
    </>
  );
};

export default DynamicTable;
