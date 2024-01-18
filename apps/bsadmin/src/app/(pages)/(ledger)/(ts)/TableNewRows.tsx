import { useEffect, useState } from "react";
import {
  IconButton,
  InputAdornment,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import {
  InputValidation,
  SelectBox,
  cjbsTheme,
  Fallback,
  ErrorContainer,
} from "cjbsDSTM";
import MyIcon from "icon/MyIcon";
import dynamic from "next/dynamic";
import { useFieldArray, useFormContext } from "react-hook-form";
import { POST, GET } from "api";
import { toast } from "react-toastify";
import { color } from "@mui/system";

const LazyPrepSelectbox = dynamic(
  () => import("../../../components/OrderSelectbox"),
  {
    ssr: false,
    loading: () => <Typography variant="body2">Loading...</Typography>,
  }
);

const TableNewRows = (props: any) => {
  // const { field, remove, index, acct, perm, errors } = props;
  const { field, remove, index, errors } = props;
  const { reset, watch, control, getValues, formState, setValue } =
    useFormContext();
  const { update } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });

  // anlsTypeMc 값 변동되는 것을 체크
  const anlsTypeMc = watch(`sample.[${index}].anlsTypeMc`);

  const unitPrice = watch(`sample.[${index}].unitPrice`);
  const supplyPrice = watch(`sample.[${index}].supplyPrice`);
  const watchSrvcTypeMc = watch(`sample.[${index}].srvcTypeMc`);
  const watchSampleSize = watch(`sample.[${index}].sampleSize`);

  const [stndSupplyPrice, setStndSupplyPrice] = useState<number>(0);
  const [sampleSizeState, setSampleSizeState] = useState<number>(0);
  const watchAddType = watch(`sample.[${index}].addType`);
  // console.log(addType);

  useEffect(() => {
    if (anlsTypeMc) {
      const fetchData = async () => {
        try {
          // 분석종류 값이 변경되면 분석종류 값을 통해 품명을 가져옴.
          const productObj = await GET(`/mngr/esPrMng/anlsType/${anlsTypeMc}`);
          setValue(`sample.[${index}].products`, productObj.data);
        } catch (error) {
          console.error("Error mngr/esPrMng/anlsType", error);
        }
      };
      fetchData();
    }
  }, [anlsTypeMc, index, setValue]);

  // 기준가 조회하기
  const callStndPrice = async () => {
    const bodyData = [
      {
        anlsTypeMc: getValues("anlsTypeMc"),
        depthMc: getValues("depthMc"),
        pltfMc: getValues("pltfMc"),
        sampleSize: getValues(`sample.[${index}].sampleSize`),
        srvcTypeMc: getValues(`sample.[${index}].srvcTypeMc`),
      },
    ];
    // console.log("************", bodyData);

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      console.log("************", response.data);
      const resData = response.data;
      if (response.success) {
        // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", index)
        if (resData[0].stndPrice === "N/A") {
          setValue(`sample.[${index}].stndPrice`, "N/A");
          setValue(`sample.[${index}].dscntPctg`, "N/A");
        } else {
          setValue(
            `sample.[${index}].stndPrice`,
            resData[0].stndPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          setValue(`sample.[${index}].dscntPctg`, 0);
        }
        setValue(`sample.[${index}].stndCode`, resData[0].stndCode);
        setValue(`sample.[${index}].unitPrice`, "0");
        setValue(`sample.[${index}].supplyPrice`, "0");
        setValue(`sample.[${index}].vat`, "0");
      } else if (response.code == "STND_PRICE_NOT_EXIST") {
        toast(response.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  // 단가 공금가액 포커스시 전체 선택 이벤트
  const handleOnFocus = (event: any) => {
    event.target.select();
  };
  // 수량 포커스시 이벤트
  const handleSampleSizeOnFocus = (event: any) => {
    event.target.select();
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    // console.log("sampleSize", sampleSize);
    setSampleSizeState(sampleSize);
  };

  // 수량 포커스 아웃시 이벤트
  const handleOnBlur = () => {
    const srvcTypeMc = getValues(`sample.[${index}].srvcTypeMc`);
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    if (sampleSizeState == sampleSize) return false;
    // console.log("srvcTypeMc", srvcTypeMc);
    // console.log("sampleSize", sampleSize);
    // console.log("watchSampleSize", watchSampleSize);
    if (srvcTypeMc !== "" && sampleSize > 0) callStndPrice();
  };

  // 단가 포커스 아웃시 이벤트
  const handleOnBlurUnitPrice = () => {
    const unitPrice = Number(
      getValues(`sample.[${index}].unitPrice`).replaceAll(",", "")
    );
    const sampleSize = getValues(`sample.[${index}].sampleSize`);
    const stndPrice = Number(
      getValues(`sample.[${index}].stndPrice`).replaceAll(",", "")
    );
    // const stndDscntPctg = Number(getValues(`sample.[${index}].stndDscntPctg`));
    console.log("unitPrice", unitPrice);
    console.log("sampleSize", sampleSize);
    console.log("stndPrice", stndPrice);
    // console.log("stndPricestndDscntPctg", stndDscntPctg);
    if (sampleSize > 0) {
      setValue(
        `sample.[${index}].supplyPrice`,
        (unitPrice * sampleSize)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      setValue(
        `sample.[${index}].vat`,
        (unitPrice * sampleSize * 0.1)
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      setStndSupplyPrice(unitPrice * sampleSize);
    }
    // 모든계산이 끝나면 단가에 콤마추가
    setValue(
      `sample.[${index}].unitPrice`,
      unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  // 공급가액 포커스 아웃시 이벤트
  const handleOnBlurSupplyPrice = () => {
    const supplyPrice = Number(
      getValues(`sample.[${index}].supplyPrice`).replaceAll(",", "")
    );

    console.log("supplyPrice", supplyPrice);
    console.log("stndSupplyPrice", stndSupplyPrice);
    if (supplyPrice - stndSupplyPrice > 10) {
      toast(
        <>
          <Typography variant="body2">
            금액이 10원 이상 변경 되었습니다.
          </Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(
        `sample.[${index}].supplyPrice`,
        stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    } else if (supplyPrice - stndSupplyPrice < -10) {
      toast(
        <>
          <Typography variant="body2">
            금액이 10원 이상 변경 되었습니다.
          </Typography>
          <Typography variant="body2">공급금액을 다시 입력해주세요.</Typography>
        </>
      );
      setValue(
        `sample.[${index}].supplyPrice`,
        stndSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    }
  };

  return (
    <>
      <TableRow>
        {/* 서비스 타입 */}
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].addType`}
            required={false}
            sx={{ display: "none" }}
          />
          <InputValidation
            inputName={`sample.[${index}].srvcCtgrVal`}
            required={false}
            sx={{
              width: 200,
              display: watchAddType === "button" ? "none" : "block",
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyPrepSelectbox
              url={"/code/list/shortly?topUniqueCode=BS_0100005"}
              inputName={`sample.[${index}].srvcTypeMc`}
              onBlur={handleOnBlur}
              sx={{
                width: 200,
                display: watchAddType === "button" ? "block" : "none",
              }}
            />
          </ErrorContainer>
          {errors.sample?.[index]?.srvcTypeMc && (
            <Typography variant="body2" color={cjbsTheme.palette.error.main}>
              값을 선택해 주세요.
            </Typography>
          )}
        </TableCell>

        {/* 분석 종류 */}
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].addType`}
            required={false}
            sx={{ display: "none" }}
          />
          <InputValidation
            inputName={`sample.[${index}].anlsTypeVal`}
            required={false}
            sx={{
              width: 150,
              display: watchAddType === "button" ? "none" : "block",
            }}
            InputProps={{
              readOnly: true,
            }}
          />
          <ErrorContainer FallbackComponent={Fallback}>
            <LazyPrepSelectbox
              url={"/code/list/shortly?topUniqueCode=BS_0100006"}
              inputName={`sample.[${index}].anlsTypeMc`}
              onBlur={handleOnBlur}
              sx={{
                width: 150,
                display: watchAddType === "button" ? "block" : "none",
              }}
            />
          </ErrorContainer>
          {errors.sample?.[index]?.anlsTypeMc && (
            <Typography variant="body2" color={cjbsTheme.palette.error.main}>
              값을 선택해 주세요.
            </Typography>
          )}
        </TableCell>

        {/* 품명 */}
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].products`}
            required={true}
            sx={{
              width: 250,
            }}
          />
        </TableCell>

        {/* 수량 */}
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].sampleSize`}
            required={true}
            pattern={/^[0-9]+$/}
            patternErrMsg="숫자만 입력해주세요."
            onBlur={handleOnBlur}
            onFocus={handleSampleSizeOnFocus}
            sx={{
              width: 80,
              ".MuiOutlinedInput-input": {
                textAlign: "end",
              },
            }}
            InputProps={{
              readOnly: watchAddType === "button" ? false : true,
            }}
          />
        </TableCell>

        {/* 단가 */}
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].unitPrice`}
            required={true}
            onBlur={handleOnBlurUnitPrice}
            onFocus={handleOnFocus}
            sx={{
              width: 150,
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

        {/* 공급가액 */}
        <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
          <InputValidation
            inputName={`sample.[${index}].supplyPrice`}
            required={true}
            onBlur={handleOnBlurSupplyPrice}
            onFocus={handleOnFocus}
            sx={{
              width: 150,
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
          <InputValidation
            inputName={`sample.[${index}].vat`}
            required={true}
            onBlur={handleOnBlurSupplyPrice}
            onFocus={handleOnFocus}
            sx={{
              width: 150,
              display: "none",
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

        {/* 삭제 */}
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
