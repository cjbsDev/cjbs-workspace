import * as React from "react";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";

import {
  Box,
  Stack,
  Table,
  TableBody, TableCell,
  TableContainer, TableHead, TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  InputValidation,
  OutlinedButton,
} from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import TableNewRows from "./TableNewRows";
import { useParams } from "next/navigation";
import { QuestionTooltip } from "../../../../components/QuestionTooltip";
import { useRecoilState } from "recoil";
import { groupListDataAtom } from "../../../../recoil/atoms/groupListDataAtom";
import { toggledClearRowsAtom } from "../../../../recoil/atoms/toggled-clear-rows-atom";
import { POST } from "api";
import { toast } from "react-toastify";


export default function AnalysisSampleDynamicTable(props: any) {
  // const serviceType = props.serviceType;
  // const { analysisSearchModalOpen, setSettlement, setSelectSampleListData } = props;
  const { analysisSearchModalOpen, setSelectSampleListData } = props;
  const { control, getValues, formState, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  // const watchFieldArray = watch("sample");
  // const controlledFields = fields.map((field, index) => {
  //   // console.log("*****************", field)
  //   return {
  //     ...field,
  //     ...watchFieldArray[index]
  //   };
  // });
  // console.log("updated", controlledFields);

  const { errors } = formState;
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] = useState<boolean>(false);
  const [selectSampleList, setSelectSampleList] = useRecoilState(groupListDataAtom);
  const [clearRowsAtom, setClearRowsAtom] = useRecoilState(toggledClearRowsAtom);

  useEffect(() => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",clearRowsAtom)
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&",fields)
    if(clearRowsAtom){
      resetTable();
      setTimeout(() => {
        callHandleAddFields(selectSampleList);
      }, 1000);
    }
  }, [selectSampleList]);

  const callHandleAddFields = async (selectSampleData: any) => {
    console.log("selectSampleData!@#!@#!@#", selectSampleData);
    //resetTable();

    if(selectSampleData !== undefined && selectSampleData.length > 0) {
      const mergeData: any = {};
      selectSampleData.map((item: any) => {
        // console.log(item)
        // srvcTypeMc을 배열로 추가 한다
        if(!mergeData.hasOwnProperty("srvcTypeMc")) {
          mergeData["srvcTypeMc"] = [];
          mergeData["srvcTypeMc"].push(item.srvcTypeMc);
        } else { // srvcTypeMc가 있을 경우 배열에 중복값을 확인하여 추가한다
          if(!mergeData["srvcTypeMc"].includes(item.srvcTypeMc)){
            mergeData["srvcTypeMc"].push(item.srvcTypeMc);
          }
        }
        if(!mergeData.hasOwnProperty(item.srvcTypeMc)) {
          mergeData[item.srvcTypeMc] = {};
        }
        if(mergeData[item.srvcTypeMc].hasOwnProperty("sampleUkey")) {
          mergeData[item.srvcTypeMc]["sampleUkey"].push(item.sampleUkey);
        } else {
          mergeData[item.srvcTypeMc]["sampleUkey"] = [];
          mergeData[item.srvcTypeMc]["srvcTypeMc"] = item.srvcTypeMc;
          mergeData[item.srvcTypeMc]["sampleUkey"].push(item.sampleUkey);
        }
      });
      console.log("end: ", mergeData)
      setSelectSampleListData(mergeData);
      mergeData["srvcTypeMc"].map((item: any) => {
        // console.log("item: ", item);
        const resData = callStndPrice(mergeData[item]["srvcTypeMc"], mergeData[item]["sampleUkey"].length)
          .then((result) => {
            // console.log(result); // 이렇게 결과를 받아서 처리할 수 있음
            append({
              addType: "modal",
              srvcTypeMc: mergeData[item]["srvcTypeMc"],
              srvcTypeVal: result[0].srvcTypeVal,
              sampleSize: mergeData[item]["sampleUkey"].length,
              unitPrice: '0',
              supplyPrice: '0',
              vat: '0',
              dscntRasnCc: "",
              stndPrice: result[0].stndPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              stndCode: result[0].stndCode,
              stndDscntPctg: result[0].stndDscntPctg,
            });
        });
      });
    }
  }

  const callStndPrice = async (data1: string, data2: number) => {
    const bodyData = [
      {
        "anlsTypeMc": getValues("anlsTypeMc"),
        "depthMc": getValues("depthMc"),
        "pltfMc": getValues("pltfMc"),
        "srvcCtgrMc": getValues("srvcCtgrMc"),
        "srvcTypeMc": data1,
        "sampleSize": data2,
      }
    ];
    // console.log("************", bodyData);

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      // console.log("************", response.data);
      const resData = response.data;
      if (response.success) {
        return resData

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

  const totalDataSum = () => {
    let sumTotCnt = 0;
    let sumTotSupplyPrice = 0;
    let sumTotVat = 0;
    let sumTotPrice;
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" + fields);

    if(fields.length === 0) {
      // setValue("totalCnt", 0);
      return false;
    }

    fields.map((item: any) => {
      // console.log(item)
      // console.log(item.supplyPrice)
      sumTotCnt += Number(item.sampleSize);
      if(typeof item.supplyPrice === "number"){
        sumTotSupplyPrice += item.supplyPrice;
        sumTotVat += item.supplyPrice * 0.1;
      } else if (typeof item.supplyPrice === "string") {
        sumTotSupplyPrice += Number(item.supplyPrice.replaceAll(",", ""));
        sumTotVat += Number(item.supplyPrice.replaceAll(",", "")) * 0.1;
      }
      // sumTotSupplyPrice += Number(item.supplyPrice.replaceAll(",", ""));
      // sumTotVat += Number(item.supplyPrice.replaceAll(",", "")) * 0.1;
    });
    // console.log("sumTotCnt", sumTotCnt)
    // console.log("sumTotSupplyPrice", sumTotSupplyPrice)
    // console.log("sumTotVat", sumTotVat)

    setValue("totalCnt", sumTotCnt);
    setValue("totalSupplyPrice", sumTotSupplyPrice);
    setValue("totalSupplyPriceVal", sumTotSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    setValue("vat", sumTotVat.toFixed(0));
    setValue("vatVal", sumTotVat.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    const totalPrice = (sumTotSupplyPrice + sumTotVat);
    setValue("totalPrice", totalPrice.toFixed(0));
    setValue("totalPriceVal", totalPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    // 선결제 금액이 있는경우
    const rmnPrePymtPrice = Number(getValues("rmnPrePymtPrice").replaceAll(",", ""));
    if(rmnPrePymtPrice > 0) {
      // 선결제 금액이 있는경우
      if(rmnPrePymtPrice >= totalPrice) { // 선결제 비용이 합계금액보다 큰경우
        setValue("remainingAmount", "0");
        setValue("settlementCost", totalPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      } else if (rmnPrePymtPrice < totalPrice) { // 선결제 비용이 합계금액보다 적은경우
        setValue("remainingAmount", (totalPrice-rmnPrePymtPrice).toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        setValue("settlementCost", rmnPrePymtPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      }
      // setSettlement(true);
    } else {
      // 선결제 금액이 없는경우
      setValue("remainingAmount", totalPrice.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
      // setSettlement(false);
    }
  };
  totalDataSum();

  const orderInfoModifyModalClose = () => {
    setShowOrderInfoModifyModal(false);
  };

  const handleAddFields = () => {
    append({ //
      addType: "button",
      srvcTypeMc: "",
      sampleSize: 0,
      unitPrice: '0',
      supplyPrice: '0',
      vat: '0',
      dscntRasnCc: "",
    });
  };

  const resetTable = async () => {
    // console.log("fields 11: ", fields);
    // setTimeout(() => {
      fields.forEach((item: any, index) => {
        console.log("item : ", item);
        remove(index);
      });
    // }, 1000);
    await removeTable();
    // console.log("fields 22: ", fields);
    setClearRowsAtom(false);
  };

  const removeTable = () => {
    fields.forEach((item: any, index) => {
      console.log("item : ", item);
      remove(index);
    });
  };

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">분석내역</Typography>
        </Stack>
      </Stack>

      <TableContainer sx={{ mb: 5, mt: 1, borderTop: "1px solid #000" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: cjbsTheme.palette.grey[100] }}>
              {/*<TableCell sx={{ paddingX: 2, paddingY: 1 }}>*/}
              {/*  <Typography variant="subtitle2">No.</Typography>*/}
              {/*</TableCell>*/}
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '15%' }}>
                <Typography variant="subtitle2">서비스 타입</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">기준가</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '5%' }}>
                <Typography variant="subtitle2">수량</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">단가</Typography>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                  <Typography variant="subtitle2">공급가액</Typography>
                  <QuestionTooltip sampleCloumn="supplyPrice" />
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">부가세</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '10%' }}>
                <Typography variant="subtitle2">사용할인율</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '25%' }}>
                <Typography variant="subtitle2">사유</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1, textAlign: "center", width: '5%' }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => {
            {/*{controlledFields.map((field, index) => {*/}
              return (
                <TableNewRows
                  key={field.id}
                  field={field}
                  remove={remove}
                  index={index}
                  errors={errors}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack direction="row" spacing={0.5} justifyContent="center" mt={3} mb={5}>
        <OutlinedButton
          size="small"
          buttonName="+서비스 타입 추가"
          onClick={() => handleAddFields()}
        />
        <ContainedButton
          size="small"
          buttonName="분석 비용 추가"
          onClick={analysisSearchModalOpen}
        />
      </Stack>

    </>
  );
};
