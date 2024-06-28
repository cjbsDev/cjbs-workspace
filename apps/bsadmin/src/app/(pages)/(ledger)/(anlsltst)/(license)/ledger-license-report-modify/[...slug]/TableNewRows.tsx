import * as React from "react";
import {Box, IconButton, InputAdornment, Stack, TableCell, TableRow, Typography} from "@mui/material";
import dynamic from "next/dynamic";
import {Controller, useFieldArray, useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import LicenseStndPrice from "../components/LicenseStndPrice";
import LicenseSampleSize from "../components/LicenseSampleSize";
import LicenseUnitPrice from "../components/LicenseUnitPrice";
import LicenseSupplyPrice from "../components/LicenseSupplyPrice";
import LicenseVat from "../components/LicenseVat";
import LicenseDscntPctg from "../components/LicenseDscntPctg";
import LicenseDscntRasnCc from "../components/LicenseDscntRasnCc";
import LicenseSrvcTypeMc from "../components/LicenseSrvcTypeMc";
import LicenseDelete from "../components/LicenseDelete";

const TableNewRows = (props:any) => {
  const { field, remove, index, errors, totalDataSum } = props;
  const { reset, watch, control, getValues, formState,setValue } = useFormContext();

  return (
    <>
      <TableRow sx={{height: "36px", paddingY: '3px'}}>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseSrvcTypeMc index={index} errors={errors} />
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseStndPrice index={index}/>
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseSampleSize index={index} errors={errors} />
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseUnitPrice index={index} errors={errors} />
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseSupplyPrice index={index} errors={errors} />
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseVat index={index} errors={errors}/>
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseDscntPctg index={index} />
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseDscntRasnCc index={index} errors={errors}/>
          {/*<Stack direction="row" alignItems="center" spacing={1} sx={{ width : '100%' }}>*/}
          {/*  <ErrorContainer FallbackComponent={Fallback}>*/}
          {/*    <LazyPrepSelectbox*/}
          {/*      url={"/code/list/shortly/value?topValue=anls itst&midValue=reason"}*/}
          {/*      inputName={`sample.[${index}].dscntRasnCc`}*/}
          {/*      required={false}*/}
          {/*      fullWidth={true}*/}
          {/*      sx={{*/}
          {/*        width : dscntRasnCc === true ? '120px' : '100%',*/}
          {/*      }}*/}
          {/*    />*/}
          {/*  </ErrorContainer>*/}
          {/*  {errors.sample?.[index]?.dscntRasnCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}*/}

          {/*  { dscntRasnCc === true  && (*/}
          {/*    <Box sx={{width: '100%'}}>*/}
          {/*      <InputValidation*/}
          {/*        inputName={`sample.[${index}].dscntRasnDetail`}*/}
          {/*        required={false}*/}
          {/*        fullWidth={true}*/}
          {/*      />*/}
          {/*    </Box>*/}
          {/*  )}*/}
          {/*</Stack>*/}
        </TableCell>
        <TableCell sx={{ p: '0 0 0 6px' }}>
          <LicenseDelete index={index} remove={remove}/>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableNewRows;
