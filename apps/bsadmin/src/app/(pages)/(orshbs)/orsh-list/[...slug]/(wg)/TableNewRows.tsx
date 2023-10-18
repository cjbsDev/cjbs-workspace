import React from "react";
import {IconButton, Stack, TableCell, TableRow, Typography} from "@mui/material";
import {InputValidation, SelectBox, cjbsTheme, Fallback, ErrorContainer, CheckboxGV} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import {useParams} from "next/navigation";
import dynamic from "next/dynamic";
import {useRecoilState} from "recoil";


const LazyPrepSelectbox = dynamic(
  () => import("../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const TableNewRows = (props: any) => {
  // const { field, remove, index, acct, perm, errors, callbackRemove } = props;
  const { field, remove, index, errors, callbackRemove, serviceType, groupOptionData } = props;
  // console.log(")))))))))", groupOptionData)
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];


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
              <InputValidation
                sx={{ display: "none" }}
                inputName={`sample.[${index}].selfQcResultFileId`}
                required={false}
              />
              {/*<InputValidation*/}
              {/*  sx={{ display: "none" }}*/}
              {/*  inputName={`sample.[${index}].depthCc`}*/}
              {/*  required={false}*/}
              {/*/>*/}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].txmy`}
                required={true}
                errorMessage="Taxonomy를 입력해 주세요."
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
              {errors.sample?.[index]?.txmy && <Typography variant="body2" color={cjbsTheme.palette.error.main}>Taxonomy를 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].locusTagPrfx`}
                required={false}
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
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyPrepSelectbox
                  url={"/code/orsh/sampleCtgr/list?type=wg_fs"}
                  inputName={`sample.[${index}].sampleCategoryCc`}
                  sx={{ width: 100 }}
                  disabled={updataYn === 'N' ? false : true}
                />
              </ErrorContainer>
              {errors.sample?.[index]?.sampleCategoryCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <SelectBox
                required={false}
                inputName={`sample.[${index}].isRdnaIdnt16S`}
                defaultOption={false}
                options={[
                  { value: "N", optionName: "NO" },
                  { value: "Y", optionName: "YES" },
                ]}
                sx={{ width: 100 }}
                disabled={updataYn === 'N' ? false : true}
              />
            </TableCell>
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
                inputName={`sample.[${index}].txmy`}
                required={true}
                errorMessage="Taxonomy를 입력해 주세요."
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
              {errors.sample?.[index]?.txmy && <Typography variant="body2" color={cjbsTheme.palette.error.main}>Taxonomy를 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].locusTagPrfx`}
                required={false}
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
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <ErrorContainer FallbackComponent={Fallback}>
                <LazyPrepSelectbox
                  url={"/code/list/shortly/value?topValue=sample&midValue=data"}
                  inputName={`sample.[${index}].dataStatusCc`}
                  sx={{ width: 100 }}
                  disabled={updataYn === 'N' ? false : true}
                />
              </ErrorContainer>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].memo`}
                required={false}
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
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <IconButton aria-label="delete" onClick={() => callbackRemove(index)}>
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
                inputName={`sample.[${index}].idx1nm`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{
                  width: 140,
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
              {errors.sample?.[index]?.idx1nm && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx1frwr`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{
                  width: 140,
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
              {errors.sample?.[index]?.idx1frwr && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx2nm`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{
                  width: 140,
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
              {errors.sample?.[index]?.idx2nm && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].idx2rvrs`}
                required={true}
                errorMessage="샘플출처를 입력해 주세요."
                sx={{
                  width: 140,
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
              {errors.sample?.[index]?.idx2rvrs && <Typography variant="body2" color={cjbsTheme.palette.error.main}>필수값을 입력해 주세요.</Typography>}
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <InputValidation
                inputName={`sample.[${index}].adapter`}
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
              <InputValidation
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
              <IconButton aria-label="delete" onClick={() => remove(index)}>
                <MyIcon icon="trash" size={20} />
              </IconButton>
            </TableCell>
          </TableRow>
        ) : (
          ''
        )
      }

      {serviceType === 'comparative' ?
        (
          <TableRow>
            <TableCell sx={{ paddingX: 2, paddingY: 1, width:100 }}>
              <Typography variant="body2">{index + 1}</Typography>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Typography
                variant="body2"
                color={cjbsTheme.palette.text.secondary}
              >
                {field.sampleNm}
              </Typography>
              <InputValidation
                inputName={`cmprGenomeAnlsDetailList.[${index}].sampleNm`}
                required={false}
                sx={{ width: 200, display: "none" }}
              />
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Stack
                spacing={1}
              >
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[0].txmy`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[1].txmy`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[2].txmy`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[3].txmy`}
                  required={false}
                  sx={{ width: 200 }}
                />
              </Stack>
            </TableCell>

            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Stack
                spacing={1}
              >
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[0].prjtAcsnNo`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[1].prjtAcsnNo`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[2].prjtAcsnNo`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[3].prjtAcsnNo`}
                  required={false}
                  sx={{ width: 200 }}
                />
              </Stack>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
              <Stack
                spacing={1}
              >
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[0].memo`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[1].memo`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[2].memo`}
                  required={false}
                  sx={{ width: 200 }}
                />
                <InputValidation
                  inputName={`cmprGenomeAnlsDetailList.[${index}].detailList.[3].memo`}
                  required={false}
                  sx={{ width: 200 }}
                />
              </Stack>
            </TableCell>
            <TableCell sx={{ paddingX: 2, paddingY: 1, width: 60 }}>
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
