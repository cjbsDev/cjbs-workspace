import React, { useState } from "react";
import { useFormContext, useFieldArray, Controller } from "react-hook-form";
import {
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  InputAdornment,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  DeletedButton,
  ErrorContainer,
  Fallback,
  InputEAType,
  InputValidation,
  OutlinedButton,
  TD,
  TH,
} from "cjbsDSTM";
import dynamic from "next/dynamic";
import MyIcon from "icon/MyIcon";
import { NumericFormat } from "react-number-format";
import DTSupplyPrice from "./components/DTSupplyPrice";
import DTUnitPrice from "./components/DTUnitPrice";
import { POST } from "api";
import { toast } from "react-toastify";

// 서비스 분류
const LazyServiceCategorySelectbox = dynamic(
  () => import("../ServiceCategorySelectbox"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="body2" color="secondary">
        Loading...
      </Typography>
    ),
  }
);

// 분석 종류
const LazyAnlsTypeSelectbox = dynamic(() => import("../AnlsTypeSelectbox"), {
  ssr: false,
  loading: () => (
    <Typography variant="body2" color="secondary">
      Loading...
    </Typography>
  ),
});

// 서비스 타입
const LazyServiceTypeSelectbox = dynamic(
  () => import("../DTServiceTypeSelectbox"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="body2" color="secondary">
        Loading...
      </Typography>
    ),
  }
);

// 플랫폼 분류
const LazyDTPlatformSelectbox = dynamic(
  () => import("../DTPlatformSelectbox"),
  {
    ssr: false,
    loading: () => (
      <Typography variant="body2" color="secondary">
        Loading...
      </Typography>
    ),
  }
);

// 생산량 ( 생산량은 분석종류가 SG 값일 경우만 활성화된다. )
const LazyDTDepthMcSelectbox = dynamic(() => import("../DTDepthMcSelectbox"), {
  ssr: false,
  loading: () => (
    <Typography variant="body2" color="secondary">
      Loading...
    </Typography>
  ),
});

// 기타 ( 모달 관련 )
const LazyDTItemAddModifyModal = dynamic(
  () => import("./components/DTItemMemoModal"),
  {
    ssr: false,
  }
);

interface ProductDetailListProps {
  anlsTypeMc: string;
  pltfMc: string;
  srvcCtgrMc: string;
  srvcTypeMc: string;
  sampleSize: number;
  supplyPrice: number;
  unitPrice: number;
  inclMemo: string;
}

// 기타 ( 모달 관련 )
interface DataItem {
  index: number;
  anlsTypeMc: string;
  inputName: string;
}

const DynamicTable = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext<{
    productDetailList: ProductDetailListProps[];
  }>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productDetailList",
  });
  const watchFieldArray = watch("productDetailList");

  const [modifiedMemo, setModifiedMemo] = useState({}); // index를 key로 하여 수정된 inclMemo 값을 저장

  const handleMemoSave = (index: number, memo: string) => {
    setModifiedMemo({ ...modifiedMemo, [index]: memo });
  };

  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  // 모달 관련 코드 진행
  const [mcCodeModifyModal, setMcCodeModifyModal] = useState<boolean>(false);
  const [selectItem, setSelectItem] = useState<DataItem>();

  // [ 마스터 코드 ] 모달 오픈
  const mcItemModifyModalOpen = (index: number) => {
    const anlsTypeMc = getValues(`productDetailList.[${index}].anlsTypeMc`);
    if (!anlsTypeMc) {
      toast("분석 종류를 먼저 선택해 주세요.");
    } else {
      const tempDataItem = {
        index: index,
        anlsTypeMc: anlsTypeMc,
        inputName: `productDetailList.[${index}].inclMemo`,
      };
      setSelectItem(tempDataItem);
      setMcCodeModifyModal(true);
    }
  };

  // [ 마스터 코드 ] 모달 닫기
  const mcItemModifyModalClose = () => {
    setMcCodeModifyModal(false);
  };

  const handleAppend = () => {
    append({
      srvcCtgrMc: "BS_0100005001",
      anlsTypeMc: "",
      srvcTypeMc: "",
      pltfMc: "",
      sampleSize: 0,
      unitPrice: 0,
      supplyPrice: 0,
    });
  };

  const toggleRowSelection = (index: number, isChecked: boolean) => {
    if (isChecked) {
      setSelectedRows([...selectedRows, index]);
    } else {
      setSelectedRows(selectedRows.filter((i) => i !== index));
    }
  };

  const toggleSelectAll = (isChecked: boolean) => {
    // console.log("isChecked", isChecked);
    if (isChecked) {
      setSelectedRows(fields.map((_, index) => index));
    } else {
      setSelectedRows([]);
    }
  };

  const isDeleteDisabled = selectedRows.length === 0;
  const handleDeleteSelected = () => {
    const rowsToDelete = [...selectedRows].sort((a, b) => b - a);
    rowsToDelete.forEach((index) => remove(index));
    setSelectedRows([]);
  };

  // 기준가 조회하기
  const callStndPrice = async (index: number) => {
    const bodyData = [
      {
        anlsTypeMc: getValues(`productDetailList.[${index}].anlsTypeMc`),
        depthMc: getValues(`productDetailList.[${index}].depthMc`),
        pltfMc: getValues(`productDetailList.[${index}].pltfMc`),
        sampleSize: getValues(`productDetailList.[${index}].sampleSize`),
        srvcCtgrMc: getValues(`productDetailList.[${index}].srvcCtgrMc`),
        srvcTypeMc: getValues(`productDetailList.[${index}].srvcTypeMc`),
      },
    ];

    // 견적서에서 기준가를 조회시 srvcCtgrMc 는 srvcTypeMc 값을 보낸다고함. // 로라 확인
    // 20240130 : Analysis 인 경우 BS_0100005001, License 인 경우 BS_0100005002
    // console.log("************", bodyData);

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      const resData = response.data;
      // console.log("PRICE response.data", resData);
      if (response.success) {
        // console.log("성공");
        // 기준가, 기준할인율,

        if (resData[0].stndPrice === "N/A") {
          // console.log("여기에 세팅되어야 댐 ");
          setValue(`productDetailList.[${index}].stndPrice`, "N/A");
          setValue(`productDetailList.[${index}].dscntPctg`, "N/A");
        } else {
          setValue(
            `productDetailList.[${index}].stndPrice`,
            resData[0].stndPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          );
          setValue(
            `productDetailList.[${index}].dscntPctg`,
            resData[0].stndDscntPctg
          );
          setValue(
            `productDetailList.[${index}].stndDscntPctg`,
            resData[0].stndDscntPctg
          );
        }
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

  // 수량 포커스 아웃시 이벤트
  const handleOnBlur = (index: number) => {
    const srvcTypeMc = getValues(`productDetailList[${index}].srvcTypeMc`);
    const sampleSize = getValues(`productDetailList[${index}].sampleSize`);
    // srvcTypeMc
    // console.log(index + " / " + srvcTypeMc + " / " + sampleSize);
    if (srvcTypeMc !== "" && sampleSize > 0) {
      callStndPrice(index);
    }
  };

  return (
    <>
      <Typography variant="subtitle1">품명(총 {fields.length}건)</Typography>
      <TableContainer sx={{ mb: 3 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TH sx={{ width: 50 }} align="center">
                <Checkbox
                  size="small"
                  checked={
                    fields.length > 0 && selectedRows.length === fields.length
                  }
                  onChange={(e) => toggleSelectAll(e.target.checked)}
                />
              </TH>
              <TH sx={{ width: 250 }}>서비스 분류</TH>
              <TH sx={{ width: 250 }}>분석 종류</TH>
              <TH sx={{ width: 250 }}>서비스 타입</TH>
              <TH sx={{ width: 250 }}>플랫폼</TH>
              <TH sx={{ width: 150 }} align="right">
                생산량
              </TH>
              <TH sx={{ width: 150 }} align="right">
                수량
              </TH>
              <TH sx={{ width: 200 }} align="right">
                단가
              </TH>
              <TH sx={{ width: 200 }} align="right">
                공급가액
              </TH>
              <TH sx={{ width: 150 }} align="right">
                할인율
              </TH>
              <TH sx={{ width: 150 }} align="right">
                기타
              </TH>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlledFields.map((field, index) => {
              return (
                <TableRow key={field.id || index}>
                  {/* 서비스 분류 */}
                  <TD>
                    <Checkbox
                      size="small"
                      checked={selectedRows.includes(index)}
                      onChange={(e) =>
                        toggleRowSelection(index, e.target.checked)
                      }
                    />
                  </TD>
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyServiceCategorySelectbox
                        inputName={`productDetailList[${index}].srvcCtgrMc`}
                        index={index}
                      />
                    </ErrorContainer>
                    {errors.productDetailList?.[index]?.srvcCtgrMc && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        서비스 분류를 선택해 주세요
                      </Typography>
                    )}
                  </TD>
                  {/* 분석 종류 */}
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyAnlsTypeSelectbox
                        inputName={`productDetailList[${index}].anlsTypeMc`}
                      />
                    </ErrorContainer>
                    {errors.productDetailList?.[index]?.anlsTypeMc && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        분석 종류를 선택해 주세요
                      </Typography>
                    )}
                  </TD>

                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyServiceTypeSelectbox
                        inputName={`productDetailList[${index}].srvcTypeMc`}
                        index={index}
                      />
                    </ErrorContainer>
                    {errors.productDetailList?.[index]?.srvcTypeMc && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        서비스 타입을 선택해 주세요
                      </Typography>
                    )}
                  </TD>

                  {/* 플랫폼 */}
                  <TD>
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyDTPlatformSelectbox
                        inputName={`productDetailList[${index}].pltfMc`}
                        fieldName="productDetailList"
                        control={control}
                        index={index}
                      />
                    </ErrorContainer>

                    {errors.productDetailList?.[index]?.pltfMc && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        플랫폼을 선택해주세요.
                      </Typography>
                    )}
                  </TD>
                  {/* 생산량 */}
                  <TD align="right">
                    <ErrorContainer FallbackComponent={Fallback}>
                      <LazyDTDepthMcSelectbox
                        inputName={`productDetailList[${index}].depthMc`}
                        fieldName="productDetailList"
                        control={control}
                        index={index}
                      />
                    </ErrorContainer>

                    {errors.productDetailList?.[index]?.pltfMc && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        생산량을 선택해주세요.
                      </Typography>
                    )}
                  </TD>
                  {/* 수량 */}
                  <TD>
                    <Controller
                      name={`productDetailList[${index}].sampleSize`}
                      control={control}
                      rules={{ required: "수량을 입력해야 합니다." }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <NumericFormat
                          defaultValue={0}
                          value={value}
                          thousandSeparator={true}
                          onBlur={handleOnBlur(index)}
                          onValueChange={(values) => {
                            onChange(values.floatValue); // 또는 `values.value`를 사용하여 문자열로 처리
                          }}
                          customInput={InputEAType}
                        />
                      )}
                    />
                    {errors.productDetailList?.[index]?.sampleSize && (
                      <Typography
                        variant="body2"
                        color={cjbsTheme.palette.warning.main}
                      >
                        수량을 입력 해주세요
                      </Typography>
                    )}
                  </TD>
                  {/* 단가 */}
                  <TD align="right">
                    <DTUnitPrice index={index} errors={errors} />
                  </TD>
                  {/* 공급가액 */}
                  <TD align="right">
                    <DTSupplyPrice
                      fieldName="productDetailList"
                      index={index}
                      errors={errors}
                      inputName={`productDetailList[${index}].supplyPrice`}
                    />
                  </TD>
                  {/* 할인율 */}
                  <TD sx={{ width: "150px", paddingY: 1 }}>
                    <InputValidation
                      inputName={`productDetailList[${index}].stndDscntPctg`}
                      required={false}
                      sx={{ width: "100%", display: "none" }}
                    />
                    <InputValidation
                      inputName={`productDetailList[${index}].isExc`}
                      required={true}
                      // sx={{ width: "100%" }}
                      sx={{ width: "100%", display: "none" }}
                    />
                    <InputValidation
                      inputName={`productDetailList[${index}].dscntPctg`}
                      required={true}
                      // required={false}
                      fullWidth={true}
                      sx={{
                        // width: 150,
                        "&.MuiTextField-root": {
                          backgroundColor: "#F1F3F5",
                        },
                        ".MuiOutlinedInput-input": {
                          textAlign: "end",
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
                  </TD>
                  {/* inclMemo: "메모 테스트", */}
                  <TD align="right">
                    <OutlinedButton
                      buttonName="확인"
                      size="small"
                      onClick={() => mcItemModifyModalOpen(index)}
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
          size="small"
          buttonName="품명 추가"
          onClick={handleAppend}
          startIcon={<MyIcon icon="plus" size={18} color="white" />}
        />
        <DeletedButton
          buttonName="삭제"
          disabled={isDeleteDisabled}
          onClick={handleDeleteSelected}
          startIcon={
            <MyIcon
              icon="trash"
              size={18}
              color={
                isDeleteDisabled
                  ? cjbsTheme.palette.grey["400"]
                  : cjbsTheme.palette.error.main
              }
            />
          }
        />
      </Stack>

      {/* 코드 수정 모달  */}
      {selectItem && (
        <LazyDTItemAddModifyModal
          onClose={mcItemModifyModalClose}
          open={mcCodeModifyModal}
          modalWidth={800}
          index={selectItem.index}
          inputName={`productDetailList[${selectItem.index}].inclMemo`}
          selectItem={selectItem}
          onSave={handleMemoSave}
          modifiedMemo={modifiedMemo[selectItem.index]} // 수정된 inclMemo 값 전달
        />
      )}
    </>
  );
};

export default DynamicTable;
