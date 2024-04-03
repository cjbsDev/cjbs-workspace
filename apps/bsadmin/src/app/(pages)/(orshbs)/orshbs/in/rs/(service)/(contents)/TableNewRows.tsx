import React from "react";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import {InputValidation, SelectBox, cjbsTheme, Fallback, ErrorContainer, RadioGV} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";


const LazyPrepSelectbox = dynamic(
  () => import("../../../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const TableNewRows = (props:any) => {
  // const { field, remove, index, acct, perm, errors } = props;
  const { field, remove, index, errors, serviceType } = props;
  return (
    <>

      {serviceType === 'fs' ?
        (
          <TableRow>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2">{index + 1}</Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].sampleNm`}
                required={true}
                defaultValue={field.sampleNm}
                pattern={/^[A-Za-z0-9-]*$/}
                sx={{ width: 200 }}
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
                inputName={`sample.[${index}].refTxmy`}
                required={true}
                sx={{ width: 240 }}
              />
              {errors.sample?.[index]?.refTxmy?.type === "required" && (
                <Typography
                  variant="body2"
                  sx={{ color: cjbsTheme.palette.error.main }}
                >
                  Reference Taxonomy을 입력해 주세요.
                </Typography>
              )}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].asmbAcsnNo`}
                required={true}
                sx={{ width: 240 }}
              />
              {errors.sample?.[index]?.asmbAcsnNo?.type === "required" && (
                <Typography
                  variant="body2"
                  sx={{ color: cjbsTheme.palette.error.main }}
                >
                  Assembly accession No를 입력해 주세요.
                </Typography>
              )}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                // inputName={`samples.${index}.memo`}
                inputName={`sample.[${index}].memo`}
                required={false}
                sx={{ width: 200 }}
              />
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <IconButton aria-label="delete" onClick={() => remove(index)}>
                <MyIcon icon="trash" size={20} />
              </IconButton>
            </TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

      {serviceType === 'ngs' ?
        (
          <TableRow>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2">{index + 1}</Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].sampleNm`}
                required={true}
                defaultValue={field.sampleNm}
                pattern={/^[A-Za-z0-9-]*$/}
                sx={{ width: 200 }}
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
                inputName={`sample.[${index}].refTxmy`}
                required={true}
                sx={{ width: 240 }}
              />
              {errors.sample?.[index]?.refTxmy?.type === "required" && (
                <Typography
                  variant="body2"
                  sx={{ color: cjbsTheme.palette.error.main }}
                >
                  Reference Taxonomy을 입력해 주세요.
                </Typography>
              )}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].asmbAcsnNo`}
                required={true}
                sx={{ width: 240 }}
              />
              {errors.sample?.[index]?.asmbAcsnNo?.type === "required" && (
                <Typography
                  variant="body2"
                  sx={{ color: cjbsTheme.palette.error.main }}
                >
                  Assembly accession No를 입력해 주세요.
                </Typography>
              )}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                // inputName={`samples.${index}.memo`}
                inputName={`sample.[${index}].memo`}
                required={false}
                sx={{ width: 200 }}
              />
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <IconButton aria-label="delete" onClick={() => remove(index)}>
                <MyIcon icon="trash" size={20} />
              </IconButton>
            </TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

      {serviceType === 'so' ?
        (
          <TableRow>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography variant="body2">{index + 1}</Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].sampleNm`}
                required={true}
                defaultValue={field.sampleNm}
                pattern={/^[A-Za-z0-9-]*$/}
                sx={{ width: 190 }}
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
                inputName={`sample.[${index}].idx1nm`}
                required={true}
                errorMessage="필수값을 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx1nm && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx1frwr`}
                required={true}
                errorMessage="필수값을 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx1frwr && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx2nm`}
                required={true}
                errorMessage="필수값을 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx2nm && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx2rvrs`}
                required={true}
                errorMessage="필수값을 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx2rvrs && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].memo`}
                required={false}
                sx={{ width: 110 }}
              />
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <IconButton aria-label="delete" onClick={() => remove(index)}>
                <MyIcon icon="trash" size={20} />
              </IconButton>
            </TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

    </>
  );
};

export default TableNewRows;
