import * as React from "react";
import {IconButton, InputAdornment, TableCell, TableRow, Typography} from "@mui/material";
import { InputValidation, SelectBox, cjbsTheme, Fallback, ErrorContainer } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";
import {useFieldArray, useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";


const LazyPrepSelectbox = dynamic(
  () => import("../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const TableNewRows = (props:any) => {
  // const { field, remove, index, acct, perm, errors } = props;
  const { field, remove, index, errors, viewPage } = props;
  const { reset, watch, control, getValues, formState,setValue } = useFormContext();
  const { update } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  // 사유를 직접입력으로 고를경우
  // (삭제 X) 현재 값 변경시 이벤트 발동 될 수있게 해주는 역활
  let dscntRasnCc = watch(`sample.[${index}].dscntRasnCc`);
  if(dscntRasnCc !== undefined) {
    dscntRasnCc = dscntRasnCc.includes("BS_1813004");
  }
  // if(!dscntRasnCc) setValue(`sample.[${index}].dscntRasnDetail`, "");

  const watchAddType = watch(`sample.[${index}].addType`)

  return (
    <>
      <TableRow>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].addType`}
            required={false}
            sx={{ display: 'none' }}
          />
          <InputValidation
            inputName={`sample.[${index}].srvcTypeVal`}
            required={false}
            fullWidth={true}
            sx={{
              // width: 200,
              // "& .MuiOutlinedInput-root": {
              //   "& fieldset": { border: 'none' },
              // },
              ".MuiOutlinedInput-input:read-only": {
                backgroundColor: "white",
                cursor: "no-drop",
                textFillColor: "#000000"
              },
              display: watchAddType === "button" ? 'none' : 'block',
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyPrepSelectbox
              url={"/code/list/shortly/value?topValue=Service Type&midValue=none"}
              inputName={`sample.[${index}].srvcTypeMc`}
              fullWidth={true}
              sx={{
                width: 200,
                display: watchAddType === "button" ? 'block' : 'none',
              }}
            />
          </ErrorContainer>
          {errors.sample?.[index]?.srvcTypeMc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].stndPrice`}
            required={true}
            fullWidth={true}
            sx={{
              width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              ".MuiOutlinedInput-input:read-only": {
                backgroundColor: "white",
                cursor: "no-drop",
                textFillColor: "#000000"
              },
              display: watchAddType === "button" ? 'none' : 'block',
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2" sx={{ color: "black" }}>
                    원
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
          <InputValidation
            inputName={`sample.[${index}].stndCode`}
            required={true}
            fullWidth={true}
            sx={{
              width: 150,
              display: 'none'
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].sampleSize`}
            required={true}
            pattern={/^[0-9]+$/}
            patternErrMsg="숫자만 입력해주세요."
            fullWidth={true}
            sx={{
              width: 80,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              ".MuiOutlinedInput-input:read-only": {
                backgroundColor: "white",
                cursor: "no-drop",
                textFillColor: "#000000"
              },
              display: watchAddType === "button" ? 'none' : 'block',
            }}
            InputProps={{
              readOnly: watchAddType === "button" ? false : true,
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].unitPrice`}
            required={true}
            fullWidth={true}
            sx={{
              width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              ".MuiOutlinedInput-input:read-only": {
                backgroundColor: "white",
                cursor: "no-drop",
                textFillColor: "#000000"
              },
              display: watchAddType === "button" ? 'none' : 'block',
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2" sx={{ color: "black" }}>
                    원
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].supplyPrice`}
            required={true}
            fullWidth={true}
            sx={{
              width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              ".MuiOutlinedInput-input:read-only": {
                backgroundColor: "white",
                cursor: "no-drop",
                textFillColor: "#000000"
              },
              display: watchAddType === "button" ? 'none' : 'block',
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2" sx={{ color: "black" }}>
                    원
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].vat`}
            required={true}
            sx={{
              width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              ".MuiOutlinedInput-input:read-only": {
                backgroundColor: "white",
                cursor: "no-drop",
                textFillColor: "#000000"
              },
              display: watchAddType === "button" ? 'none' : 'block',
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2" sx={{ color: "black" }}>
                    원
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].stndDscntPctg`}
            required={true}
            sx={{ width: 100, display: "none" }}
          />
          <InputValidation
            inputName={`sample.[${index}].isExc`}
            required={true}
            sx={{ width: 100, display: "none" }}
          />
          <InputValidation
            inputName={`sample.[${index}].dscntPctg`}
            required={true}
            sx={{
              width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              ".MuiOutlinedInput-input:read-only": {
                backgroundColor: "white",
                cursor: "no-drop",
                textFillColor: "#000000"
              },
              display: watchAddType === "button" ? 'none' : 'block',
            }}
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <Typography variant="body2" sx={{ color: "black" }}>
                    %
                  </Typography>
                </InputAdornment>
              ),
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyPrepSelectbox
              url={"/code/list/shortly/value?topValue=anls itst&midValue=reason"}
              inputName={`sample.[${index}].dscntRasnCc`}
              required={false}
              disabled={true}
              sx={{
                ".Mui-disabled ": {
                  backgroundColor: "white",
                  border: '0px',
                  textFillColor: "#000000",
                  pr: '0px !important',
                  cursor: "no-drop",
                },
                display: watchAddType === "button" ? 'none' : 'block',
              }}
            />
          </ErrorContainer>
          {errors.sample?.[index]?.dscntRasnCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}

          { dscntRasnCc === true  && (
            <InputValidation
              inputName={`sample.[${index}].dscntRasnDetail`}
              required={false}
              fullWidth={true}
              sx={{
                mt: 0.5,
                ".MuiOutlinedInput-input:read-only": {
                  backgroundColor: "white",
                  cursor: "no-drop",
                  textFillColor: "#000000"
                },
                display: watchAddType === "button" ? 'none' : 'block',
              }}
              InputProps={{
                readOnly: true,
              }}
            />
          )}

        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          {watchAddType === "button" && (
            <IconButton aria-label="delete" onClick={() => remove(index)}>
              <MyIcon icon="trash" size={20} />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableNewRows;
