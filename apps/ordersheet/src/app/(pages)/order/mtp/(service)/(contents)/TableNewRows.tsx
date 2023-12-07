import React from "react";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import {InputValidation, SelectBox, cjbsTheme, Fallback, ErrorContainer} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";

const LazyPrepSelectbox = dynamic(
  () => import("@components/OrderSelectbox"),
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
                // inputName={`samples.${index}.sampleNm`}
                inputName={`sample.[${index}].sampleNm`}
                required={true}
                defaultValue={field.sampleNm}
                //errorMessage="샘플명을 입력해 주세요."
                pattern={/^[A-Za-z0-9-]*$/}
                //patternErrMsg="영문, 숫자, -(하이픈)만 입력 가능합니다."
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
                // inputName={`samples.${index}.source`}
                inputName={`sample.[${index}].source`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{ width: 200 }}
              />
              {errors.sample?.[index]?.source && <Typography variant="body2" color={cjbsTheme.palette.error.main}>샘플출처를 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyPrepSelectbox
                  // url={"/code/list/shortly/value?topValue=sample&midValue=category"}
                  url={"/code/orsh/sampleCtgr/list?type=mtp_fs"}
                  inputName={`sample.[${index}].sampleCategoryCc`}
                />
              </ErrorContainer>
              {errors.sample?.[index]?.sampleCategoryCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyPrepSelectbox
                  // url={"/code/list/shortly/value?topValue=sample&midValue=genome"}
                  url={"/code/orsh/sampleGenome/list?type=mtp_fs"}
                  inputName={`sample.[${index}].anlsTargetGeneCc`}
                />
              </ErrorContainer>
              {errors.sample?.[index]?.anlsTargetGeneCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                // inputName={`samples.${index}.memo`}
                inputName={`sample.[${index}].memo`}
                required={false}
                sx={{ width: 117 }}
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

      {serviceType === 'ao' ?
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
                inputName={`sample.[${index}].source`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{ width: 100 }}
              />
              {errors.sample?.[index]?.source && <Typography variant="body2" color={cjbsTheme.palette.error.main}>샘플출처를 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyPrepSelectbox
                  // url={"/code/list/shortly/value?topValue=sample&midValue=genome"}
                  url={"/code/orsh/sampleGenome/list?type=mtp_ao"}
                  inputName={`sample.[${index}].anlsTargetGeneCc`}
                />
              </ErrorContainer>
              {errors.sample?.[index]?.anlsTargetGeneCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].frwrPrimer`}
                required={false}
                sx={{ width: 117 }}
              />
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].rvrsPrimer`}
                required={false}
                sx={{ width: 117 }}
              />
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].memo`}
                required={false}
                sx={{ width: 117 }}
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
                inputName={`sample.[${index}].idx1nm`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx1nm && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx1frwr`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx1frwr && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx2nm`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx2nm && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx2rvrs`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{ width: 140 }}
              />
              {errors.sample?.[index]?.idx2rvrs && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].memo`}
                required={false}
                sx={{ width: 117 }}
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
