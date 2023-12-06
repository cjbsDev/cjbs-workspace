import * as React from "react";
import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { InputValidation, SelectBox, cjbsTheme, Fallback, ErrorContainer } from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";
import {useFormContext} from "react-hook-form";
import {useEffect, useState} from "react";
import {POST} from "api";
import {toast} from "react-toastify";
import {color} from "@mui/system";


const LazyPrepSelectbox = dynamic(
  () => import("../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const TableNewRows = (props:any) => {
  // const { field, remove, index, acct, perm, errors } = props;
  const { field, remove, index, errors } = props;
  const { watch, control, getValues, formState,setValue } = useFormContext();
  // 사유를 직접입력으로 고를경우
  const dscntRasnCc = watch(`sample.[${index}].dscntRasnCc`).includes("BS_1813004");
  const [disCountChk, setDisCountChk] = useState<boolean>(false);
  const [stndSupplyPrice, setStndSupplyPrice] = useState<number>(0);
  const addType = getValues(`sample.[${index}].addType`)
  // console.log(addType);

  useEffect(() => {
    return () => {
      if(addType === "modal") callStndPrice();
      if(!dscntRasnCc) setValue(`sample.[${index}].dscntRasnDetail`, "");
    }
  }, [addType, dscntRasnCc]);

  // 기준가 조회하기
  const callStndPrice = async () => {
    const bodyData = [
      {
        "anlsTypeMc": getValues("anlsTypeMc"),
        "depthMc": getValues("depthMc"),
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
        setValue(`sample.[${index}].stndPrice`, resData[0].stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        setValue(`sample.[${index}].stndCode`, resData[0].stndCode);
        setValue(`sample.[${index}].stndDscntPctg`, resData[0].stndDscntPctg);

      } else if (response.code == "STND_PRICE_NOT_EXIST") {
        toast(response.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  }

  // 수량 포커스 아웃시 이벤트
  const handleOnBlur =  () => {
    const srvcTypeMc = getValues(`sample.[${index}].srvcTypeMc`);
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    console.log("srvcTypeMc", srvcTypeMc);
    console.log("sampleSize", sampleSize);
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
    if(sampleSize > 0) {
      setValue(`sample.[${index}].supplyPrice`, (unitPrice * sampleSize).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      setStndSupplyPrice((unitPrice * sampleSize));

      let disCountPercent: number;
      if (unitPrice >= 0 ) {
        if (stndPrice > unitPrice) {
          console.log("11");
          // setValue(`sample.[${index}].dscntPctg`, (((stndPrice - unitPrice) / stndPrice) * 100).toFixed(2) + "%");
          disCountPercent = Math.round((((stndPrice - unitPrice) / stndPrice) * 100) * 100) / 100.0;
          setValue(`sample.[${index}].dscntPctg`, disCountPercent + "%");

        } else if (stndPrice < unitPrice) {
          console.log("22");
          // setValue(`sample.[${index}].dscntPctg`, ((((unitPrice - stndPrice) / stndPrice) * 100) + 100).toFixed(2) + "%");
          disCountPercent = Math.round(((((unitPrice - stndPrice) / stndPrice) * 100) + 100) * 100) / 100.0
          setValue(`sample.[${index}].dscntPctg`, disCountPercent + "%");

        } else if (stndPrice == unitPrice) {
          console.log("33");
          disCountPercent = 0;
          setValue(`sample.[${index}].dscntPctg`, "0%");

        }
      } else {
        setValue(`sample.[${index}].dscntPctg`, "-");
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
  }

  // 공급가액 포커스 아웃시 이벤트
  const handleOnBlurSupplyPrice =  () => {
    const supplyPrice = Number(getValues(`sample.[${index}].supplyPrice`).replaceAll(",", ""));

    console.log("supplyPrice", supplyPrice);
    console.log("stndSupplyPrice", stndSupplyPrice);
    if((supplyPrice - stndSupplyPrice) > 1000) {
      // toast(`금액이 1,000원 이상 변경 되었습니다. </br> 원래공급가액 ${stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 으로 변경됩니다.`);
      toast(
        <>
          <Typography variant="body2">금액이 1,000원 이상 변경 되었습니다.</Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(`sample.[${index}].supplyPrice`, stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    } else if ((supplyPrice - stndSupplyPrice) < -1000) {
      // toast(`-1,000원 이상 입니다. 원래공급가액 ${stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 으로 변경됩니다.`);
      toast(
        <>
          <Typography variant="body2">금액이 1,000원 이상 변경 되었습니다.</Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(`sample.[${index}].supplyPrice`, stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    }
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

          <ErrorContainer FallbackComponent={Fallback}>
            <LazyPrepSelectbox
              url={"/code/list/shortly/value?topValue=Service Type&midValue=none"}
              inputName={`sample.[${index}].srvcTypeMc`}
              onBlur={handleOnBlur}
              sx={{ width: 250 }}
              disabled={addType === "button" ? false : true}
            />
          </ErrorContainer>
          {errors.sample?.[index]?.srvcTypeMc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].stndPrice`}
            required={true}
            sx={{ width: 150 }}
            InputProps={{
              readOnly: true,
            }}
          />
          <InputValidation
            inputName={`sample.[${index}].stndCode`}
            required={true}
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
            sx={{ width: 100 }}
            onBlur={addType === "button" ? handleOnBlur : null}
            InputProps={{
              readOnly: addType === "button" ? false : true,
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].unitPrice`}
            required={false}
            onBlur={handleOnBlurUnitPrice}
            sx={{ width: 150 }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].supplyPrice`}
            required={false}
            onBlur={handleOnBlurSupplyPrice}
            sx={{ width: 150 }}
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
              width: 100,
              // color: disCountChk === true ? 'red' : "#000000"
              ".MuiOutlinedInput-input:read-only": {
                textFillColor: disCountChk === true ? "#f10505" : "#000000"
              },
            }}
            InputProps={{
              readOnly: true,
            }}
          />
        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyPrepSelectbox
              url={"/code/list/shortly/value?topValue=anls itst&midValue=reason"}
              inputName={`sample.[${index}].dscntRasnCc`}
              sx={{ width: 400 }}
            />
          </ErrorContainer>
          {errors.sample?.[index]?.dscntRasnCc && <Typography variant="body2" color={cjbsTheme.palette.error.main}>값을 선택해 주세요.</Typography>}

          { dscntRasnCc === true  && (
            <InputValidation
              inputName={`sample.[${index}].dscntRasnDetail`}
              required={false}
              sx={{ width: 400, mt: 0.5 }}
            />
          )}

        </TableCell>
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          {addType === "button" && (
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
