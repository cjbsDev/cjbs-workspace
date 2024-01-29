import * as React from "react";
import {Box, IconButton, InputAdornment, Stack, TableCell, TableRow, Typography} from "@mui/material";
import { InputValidation, SelectBox, cjbsTheme, Fallback, ErrorContainer } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";
import {useFieldArray, useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";
import {POST} from "api";
import {toast} from "react-toastify";
import {color} from "@mui/system";
import { monthlyViewAtom } from "../../../../../recoil/atoms/monthlyViewAtom";
import {useRecoilState} from "recoil";


const LazyPrepSelectbox = dynamic(
  () => import("../../../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const TableNewRows = (props:any) => {
  // const { field, remove, index, acct, perm, errors } = props;
  const { field, remove, index, errors } = props;
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
  if(!dscntRasnCc) setValue(`sample.[${index}].dscntRasnDetail`, "");

  const unitPrice = watch(`sample.[${index}].unitPrice`);
  const supplyPrice = watch(`sample.[${index}].supplyPrice`);
  const watchSrvcTypeMc = watch(`sample.[${index}].srvcTypeMc`);
  const watchSampleSize = watch(`sample.[${index}].sampleSize`);

  const [disCountChk, setDisCountChk] = useState<boolean>(false);
  const [stndSupplyPrice, setStndSupplyPrice] = useState<number>(0);
  const [sampleSizeState, setSampleSizeState] = useState<number>(0);
  // 월비용 노출/미노출
  const [isMonthly, setIsMonthly] = useRecoilState(monthlyViewAtom);
  const watchAddType = watch(`sample.[${index}].addType`);
  // console.log(addType);

  useEffect(() => {
    return () => {
      // console.log("addType=="+watchAddType)
      // console.log("srvcTypeMc=="+watchSrvcTypeMc)
      // console.log("sampleSize=="+watchSampleSize)
      // console.log("???????????????index : "+index)
      // if(watchAddType === "modal" && watchSrvcTypeMc !== undefined && watchSampleSize > 0) {
      //   console.log("??????????????????????????????????????????????????????????????????")
        // setTimeout(() => {
        //   callStndPrice();
        // }, 1000);
      // }
    }
  }, []);

  // 기준가 조회하기
  const callStndPrice = async () => {
    const bodyData = [
      {
        "anlsTypeMc": getValues("anlsTypeMc"),
        "depthMc": 'BS_0100010001',
        "pltfMc": getValues("pltfMc"),
        "sampleSize": getValues(`sample.[${index}].sampleSize`),
        "srvcCtgrMc": getValues("srvcCtgrMc"),
        "srvcTypeMc": getValues(`sample.[${index}].srvcTypeMc`),
      }
    ];
    // console.log("************", bodyData);

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      console.log("************", response.data);
      const resData = response.data;
      if (response.success) {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", index)
        if(resData[0].stndPrice === 'N/A'){
          setValue(`sample.[${index}].stndPrice`, 'N/A');
          setValue(`sample.[${index}].dscntPctg`, 'N/A');
        } else {
          setValue(`sample.[${index}].stndPrice`, resData[0].stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
          setValue(`sample.[${index}].dscntPctg`, 0);
        }
        setValue(`sample.[${index}].stndCode`, resData[0].stndCode);
        setValue(`sample.[${index}].stndDscntPctg`, resData[0].stndDscntPctg);
        setValue(`sample.[${index}].unitPrice`, '0');
        setValue(`sample.[${index}].supplyPrice`, '0');
        setValue(`sample.[${index}].vat`, '0');

      } else if (response.code == "STND_PRICE_NOT_EXIST") {
        toast(response.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    } finally {
      // 합계금액이 달라졌을경우 월비용에 대한 값이 초기화 된다.
      setIsMonthly(false);
    }
  }

  // 단가 공금가액 포커스시 전체 선택 이벤트
  const handleOnFocus =  (event: any) => {
    event.target.select();
  }
  // 수량 포커스시 이벤트
  const handleSampleSizeOnFocus =  (event: any) => {
    event.target.select();
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    // console.log("sampleSize", sampleSize);
    setSampleSizeState(sampleSize);
  }

  // 수량 포커스 아웃시 이벤트
  const handleOnBlur =  () => {
    const srvcTypeMc = getValues(`sample.[${index}].srvcTypeMc`);
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    if(sampleSizeState == sampleSize) return false;
    // console.log("srvcTypeMc", srvcTypeMc);
    // console.log("sampleSize", sampleSize);
    // console.log("watchSampleSize", watchSampleSize);
    if(srvcTypeMc !== "" && sampleSize > 0) callStndPrice();
  }

  // 단가 포커스 아웃시 이벤트
  const handleOnBlurUnitPrice =  () => {
    const unitPrice = Number(getValues(`sample.[${index}].unitPrice`).replaceAll(",", ""));
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    const stndPrice = Number(getValues(`sample.[${index}].stndPrice`).replaceAll(",", ""));
    const stndDscntPctg = Number(getValues(`sample.[${index}].stndDscntPctg`));
    console.log("unitPrice", unitPrice);
    console.log("sampleSize", sampleSize);
    console.log("stndPrice", stndPrice);
    console.log("stndPricestndDscntPctg", stndDscntPctg);
    if(sampleSize > 0) {
      setValue(`sample.[${index}].supplyPrice`, (unitPrice * sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setValue(`sample.[${index}].vat`, ((unitPrice * sampleSize) * 0.1).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setStndSupplyPrice((unitPrice * sampleSize));

      let disCountPercent: number = 0;
      if (unitPrice >= 0 ) {
        if (isNaN(stndPrice) || stndPrice === 0) {
          disCountPercent = 0;
          setValue(`sample.[${index}].dscntPctg`, "N/A");
        } else {
          if (stndPrice > unitPrice) {
            disCountPercent = Math.round((((stndPrice - unitPrice) / stndPrice) * 100) * 100) / 100.0;
            setValue(`sample.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice < unitPrice) {
            disCountPercent = Math.round(((((unitPrice - stndPrice) / stndPrice) * 100) + 100) * 100) / 100.0
            setValue(`sample.[${index}].dscntPctg`, disCountPercent);
          } else if (stndPrice == unitPrice) {
            disCountPercent = 0;
            setValue(`sample.[${index}].dscntPctg`, "0");
          }
        }

      } else {
        setValue(`sample.[${index}].dscntPctg`, "-");
        setValue(`sample.[${index}].isExc`, "N");
      }

      if(disCountPercent > stndDscntPctg) {
        if(disCountPercent > 100) {
          setValue(`sample.[${index}].isExc`, "N");
          setDisCountChk(false);
        } else {
          setValue(`sample.[${index}].isExc`, "Y");
          setDisCountChk(true);
        }
      } else {
        setValue(`sample.[${index}].isExc`, "N");
        setDisCountChk(false);
      }

    }
    // 모든계산이 끝나면 단가에 콤마추가
    setValue(`sample.[${index}].unitPrice`, unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    // 합계금액이 달라졌을경우 월비용에 대한 값이 초기화 된다.
    setIsMonthly(false);
  }

  // 공급가액 포커스 아웃시 이벤트
  const handleOnBlurSupplyPrice =  () => {
    const supplyPrice = Number(getValues(`sample.[${index}].supplyPrice`).replaceAll(",", ""));

    console.log("supplyPrice", supplyPrice);
    console.log("stndSupplyPrice", stndSupplyPrice);
    if((supplyPrice - stndSupplyPrice) > 10) {
      toast(
        <>
          <Typography variant="body2">금액이 10원 이상 변경 되었습니다.</Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(`sample.[${index}].supplyPrice`, stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else if ((supplyPrice - stndSupplyPrice) < -10) {
      toast(
        <>
          <Typography variant="body2">금액이 10원 이상 변경 되었습니다.</Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(`sample.[${index}].supplyPrice`, stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
    // 합계금액이 달라졌을경우 월비용에 대한 값이 초기화 된다.
    setIsMonthly(false);
  }

  return (
    <>
      <TableRow>
        {/*<TableCell sx={{ paddingX: 2, paddingY: 1 }}>*/}
        {/*  <Typography variant="body2">{index + 1}</Typography>*/}
        {/*</TableCell>*/}
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
              onBlur={handleOnBlur}
              fullWidth={true}
              sx={{
                // width: 200,
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
              // width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              "&.MuiTextField-root" : {
                backgroundColor : "#F1F3F5",
              },
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
            sx={{
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
            onBlur={handleOnBlur}
            onFocus={handleSampleSizeOnFocus}
            fullWidth={true}
            sx={{
              // width: 80,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
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
            onBlur={handleOnBlurUnitPrice}
            onFocus={handleOnFocus}
            fullWidth={true}
            sx={{
              // width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
            }}
            InputProps={{
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
            onBlur={handleOnBlurSupplyPrice}
            onFocus={handleOnFocus}
            fullWidth={true}
            sx={{
              // width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
            }}
            InputProps={{
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
              onBlur={handleOnBlurSupplyPrice}
              onFocus={handleOnFocus}
              fullWidth={true}
              sx={{
                // width: 150,
                // display: "none",
                ".MuiOutlinedInput-input": {
                  textAlign: "end",
                },
                "&.MuiTextField-root" : {
                  backgroundColor : "#F1F3F5",
                },
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
            fullWidth={true}
            sx={{
              // width: 150,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
              "&.MuiTextField-root" : {
                backgroundColor : "#F1F3F5",
              },
              ".MuiOutlinedInput-input:read-only": {
                textFillColor: disCountChk === true ? "#f10505" : "#000000"
              },
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
          <Stack direction="row" alignItems="center" spacing={1} sx={{width : '100%'}}>
            <ErrorContainer FallbackComponent={Fallback}>
              <LazyPrepSelectbox
                url={"/code/list/shortly/value?topValue=anls itst&midValue=reason"}
                inputName={`sample.[${index}].dscntRasnCc`}
                required={false}
                fullWidth={true}
                sx={{
                  width : dscntRasnCc === true ? '120px' : '100%',
                }}
              />
            </ErrorContainer>
            {errors.sample?.[index]?.dscntRasnCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
            { dscntRasnCc === true  && (
              <Box sx={{width: '100%'}}>
                <InputValidation
                  inputName={`sample.[${index}].dscntRasnDetail`}
                  required={false}
                  fullWidth={true}
                />
              </Box>
            )}
          </Stack>
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
