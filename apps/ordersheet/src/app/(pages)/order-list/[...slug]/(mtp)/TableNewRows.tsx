import React from "react";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import {InputValidation, SelectBox, cjbsTheme, Fallback, ErrorContainer} from "cjbsDSTM";
import MyIcon from "icon/myIcon";
import {useParams} from "next/navigation";
import dynamic from "next/dynamic";


const LazyPrepSelectbox = dynamic(
  () => import("../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);
const TableNewRows = (props) => {
  // const { field, remove, index, acct, perm, errors, callbackRemove } = props;
  const { field, remove, index, errors, callbackRemove } = props;
  const params = useParams();
  console.log("params", params.slug[2]);
  const updataYn = params.slug[2];

  return (
    <TableRow>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <Typography variant="body2">{index + 1}</Typography>
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <InputValidation
          // inputName={`samples.${index}.sampleNm`}
          inputName={`sample.[${index}].sampleNm`}
          required={true}
          defaultValue={field.sampleNm}
          //errorMessage="샘플명을 입력해 주세요."
          pattern={/^[A-Za-z0-9-]*$/}
          //patternErrMsg="영문, 숫자, -(하이픈)만 입력 가능합니다."
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: updataYn === 'N' ? '' : 'none' },
            },
            ".MuiOutlinedInput-input:read-only": {
              backgroundColor: "white",
              cursor: "pointer",
              textFillColor: "#000000"
            },
          }}
          InputProps={{
            readOnly: updataYn === 'N' ? false : true
          }}
        />
        {errors.sample?.[index]?.sampleNm?.type === "required" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.error.main }}
          >
            샘플명을 입력해 주세요.
          </Typography>
        )}
        {errors.sample?.[index]?.sampleNm?.type === "pattern" && (
          <Typography
            variant="body2"
            sx={{ color: cjbsTheme.palette.error.main }}
          >
            영문, 숫자, -(하이픈)만 입력 가능합니다.
          </Typography>
        )}
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <InputValidation
          // inputName={`samples.${index}.source`}
          inputName={`sample.[${index}].source`}
          required={true}
          errorMessage="샘플출처를 입력해 주세요."
          sx={{
            width: 200,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: updataYn === 'N' ? '' : 'none' },
            },
            ".MuiOutlinedInput-input:read-only": {
              backgroundColor: "white",
              cursor: "pointer",
              textFillColor: "#000000"
            },
          }}
          InputProps={{
            readOnly: updataYn === 'N' ? false : true
          }}
        />
        {errors.sample?.[index]?.source && <Typography variant="body2" color={cjbsTheme.palette.error.main}>샘플출처를 입력해 주세요.</Typography>}
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyPrepSelectbox url={"/code/list/shortly/value?topValue=sample&midValue=category"} inputName={`sample.[${index}].sampleCategoryCc`} />
        </ErrorContainer>
        {/*<SelectBox*/}
        {/*  required={true}*/}
        {/*  errorMessage="값을 선택해 주세요."*/}
        {/*  // inputName={`samples.${index}.sampleCategoryCc`}*/}
        {/*  inputName={`sample.[${index}].sampleCategoryCc`}*/}
        {/*  options={acct}*/}
        {/*  sx={{*/}
        {/*    width: 200,*/}
        {/*    "& .MuiOutlinedInput-root": {*/}
        {/*      "& fieldset": { border: updataYn === 'N' ? '' : 'none' },*/}
        {/*    },*/}
        {/*    ".MuiOutlinedInput-input:read-only": {*/}
        {/*      backgroundColor: "white",*/}
        {/*      cursor: "pointer",*/}
        {/*      textFillColor: "#000000"*/}
        {/*    },*/}
        {/*  }}*/}
        {/*  InputProps={{*/}
        {/*    readOnly: updataYn === 'N' ? false : true*/}
        {/*  }}*/}
        {/*/>*/}
        {errors.sample?.[index]?.sampleCategoryCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <ErrorContainer FallbackComponent={Fallback}>
          <LazyPrepSelectbox url={"/code/list/shortly/value?topValue=sample&midValue=genome"} inputName={`sample.[${index}].anlsTargetGeneCc`} />
        </ErrorContainer>
        {/*<SelectBox*/}
        {/*  required={true}*/}
        {/*  errorMessage="값을 선택해 주세요."*/}
        {/*  // inputName={`samples.${index}.anlsTargetGeneCc`}*/}
        {/*  inputName={`sample.[${index}].anlsTargetGeneCc`}*/}
        {/*  options={perm}*/}
        {/*  sx={{*/}
        {/*    width: 200,*/}
        {/*    "& .MuiOutlinedInput-root": {*/}
        {/*      "& fieldset": { border: updataYn === 'N' ? '' : 'none' },*/}
        {/*    },*/}
        {/*    ".MuiOutlinedInput-input:read-only": {*/}
        {/*      backgroundColor: "white",*/}
        {/*      cursor: "pointer",*/}
        {/*      textFillColor: "#000000"*/}
        {/*    },*/}
        {/*  }}*/}
        {/*  InputProps={{*/}
        {/*    readOnly: updataYn === 'N' ? false : true*/}
        {/*  }}*/}
        {/*  className={errors.sample?.[index]?.anlsTargetGeneCc && "Mui-error"}*/}
        {/*/>*/}
        {errors.sample?.[index]?.anlsTargetGeneCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
      </TableCell>
      {/*<TableCell sx={{ paddingX: 2, paddingY: 1 }}>*/}
      {/*  <InputValidation*/}
      {/*    // inputName={`samples.${index}.qc`}*/}
      {/*    inputName={`sample[${index}].qc`}*/}
      {/*    required={false}*/}
      {/*    sx={{ width: 117 }}*/}
      {/*  />*/}
      {/*</TableCell>*/}
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <InputValidation
          // inputName={`samples.${index}.memo`}
          inputName={`sample.[${index}].memo`}
          required={false}
          sx={{
            width: 117,
            "& .MuiOutlinedInput-root": {
              "& fieldset": { border: updataYn === 'N' ? '' : 'none' },
            },
            ".MuiOutlinedInput-input:read-only": {
              backgroundColor: "white",
              cursor: "pointer",
              textFillColor: "#000000"
            },
          }}
          InputProps={{
            readOnly: updataYn === 'N' ? false : true
          }}
        />
      </TableCell>
      <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
        <IconButton aria-label="delete" onClick={() => callbackRemove(index)}>
          <MyIcon icon="trash" size={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TableNewRows;
