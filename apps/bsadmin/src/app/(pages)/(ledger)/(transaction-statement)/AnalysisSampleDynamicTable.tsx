import * as React from "react";
import { useState, useEffect } from "react";
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { cjbsTheme, ContainedButton, OutlinedButton } from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import TableNewRows from "./TableNewRows";
import { QuestionTooltip } from "../../../components/QuestionTooltip";
import { useRecoilState } from "recoil";
import { groupListDataAtom } from "../../../recoil/atoms/groupListDataAtom";
import { toggledClearRowsAtom } from "../../../recoil/atoms/toggled-clear-rows-atom";
import { POST } from "api";
import { toast } from "react-toastify";

export default function AnalysisSampleDynamicTable(props: any) {
  const { setSelectSampleListData, selectSampleList } = props;
  const { control, getValues, formState, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const watchFieldArray = watch("sample");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });

  const { errors } = formState;
  // const [selectSampleList, setSelectSampleList] =
  //   useRecoilState(groupListDataAtom);

  const [clearRowsAtom, setClearRowsAtom] =
    useRecoilState(toggledClearRowsAtom);

  useEffect(() => {
    callHandleAddFields(selectSampleList);
    if (clearRowsAtom) {
      resetTable();
    }
  }, [selectSampleList]);

  // AnalysisRegView 에서 호출
  const callHandleAddFields = async (selectSampleData: any) => {
    // console.log("in callHandleAddFields", selectSampleData);
    // resetTable();

    if (selectSampleData !== undefined && selectSampleData.length > 0) {
      const mergeData: any = {};
      selectSampleData.map((item: any) => {
        // console.log(item)
        // srvcTypeMc을 배열로 추가 한다
        if (!mergeData.hasOwnProperty("srvcTypeMc")) {
          mergeData["srvcTypeMc"] = [];
          mergeData["srvcTypeMc"].push(item.srvcTypeMc);
        } else {
          // srvcTypeMc가 있을 경우 배열에 중복값을 확인하여 추가한다
          if (!mergeData["srvcTypeMc"].includes(item.srvcTypeMc)) {
            mergeData["srvcTypeMc"].push(item.srvcTypeMc);
          }
        }
        if (!mergeData.hasOwnProperty(item.srvcTypeMc)) {
          mergeData[item.srvcTypeMc] = {};
        }

        if (mergeData[item.srvcTypeMc].hasOwnProperty("sampleUkey")) {
          mergeData[item.srvcTypeMc]["sampleUkey"].push(item.sampleUkey);
        } else {
          mergeData[item.srvcTypeMc]["sampleUkey"] = [];
          mergeData[item.srvcTypeMc]["srvcTypeMc"] = item.srvcTypeMc;
          mergeData[item.srvcTypeMc]["sampleUkey"].push(item.sampleUkey);
        }
      });
      // console.log("end: ", mergeData);
      setSelectSampleListData(mergeData);
      // resetTable();
      // setTimeout(() => {
      mergeData["srvcTypeMc"].map((item: any) => {
        // console.log("item: ", item);
        const resData = callStndPrice(
          mergeData[item]["srvcTypeMc"],
          mergeData[item]["sampleUkey"].length
        ).then((result) => {
          // console.log(result); // 이렇게 결과를 받아서 처리할 수 있음
          append({
            addType: "modal",
            srvcTypeMc: mergeData[item]["srvcTypeMc"],
            srvcTypeVal: result[0].srvcTypeVal,
            sampleSize: mergeData[item]["sampleSize"],
            unitPrice: "0",
            supplyPrice: "0",
            vat: "0",
            dscntRasnCc: "",
            stndPrice: result[0].stndPrice
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            stndCode: result[0].stndCode,
            stndDscntPctg: result[0].stndDscntPctg,
          });
        });
      });
      // }, 500);
    }
  };

  const callStndPrice = async (data1: string, data2: number) => {
    const bodyData = [
      {
        anlsTypeMc: getValues("anlsTypeMc"),
        depthMc: getValues("depthMc"),
        pltfMc: getValues("pltfMc"),
        srvcTypeMc: data1,
        sampleSize: data2,
      },
    ];
    // console.log("************", bodyData);

    try {
      const response = await POST(`/anls/itst/stnd/price`, bodyData);
      // console.log("************", response.data);
      const resData = response.data;
      if (response.success) {
        return resData;
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

  const totalDataSum = () => {
    // console.log("in totalDataSum");
    let sumTotCnt = 0;
    let sumTotSupplyPrice = 0;
    let sumTotVat = 0;

    if (controlledFields.length === 0) {
      setValue("totalCnt", 0);
      return false;
    }

    controlledFields.map((item: any) => {
      // console.log(item)
      // console.log(item.supplyPrice)
      sumTotCnt += Number(item.sampleSize);
      sumTotSupplyPrice += Number(item.supplyPrice.replaceAll(",", ""));
      sumTotVat += Number(item.supplyPrice.replaceAll(",", "")) * 0.1;
    });
    // console.log("sumTotCnt", sumTotCnt)
    // console.log("sumTotSupplyPrice", sumTotSupplyPrice)
    // console.log("sumTotVat", sumTotVat)

    setValue("totalCnt", sumTotCnt);
    setValue("totalSupplyPrice", sumTotSupplyPrice);
    setValue(
      "totalSupplyPriceVal",
      sumTotSupplyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    setValue("vat", sumTotVat.toFixed(0));
    setValue(
      "vatVal",
      sumTotVat
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
    const totalPrice = sumTotSupplyPrice + sumTotVat;
    setValue("totalPrice", totalPrice.toFixed(0));
    setValue(
      "totalPriceVal",
      totalPrice
        .toFixed(0)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    );
  };
  totalDataSum();

  const handleAddFields = () => {
    append({
      addType: "button",
      srvcTypeMc: "",
      sampleSize: 0,
      unitPrice: "0",
      supplyPrice: "0",
      vat: "0",
    });
  };

  const resetTable = () => {
    // console.log("fields 11: ", fields);
    setTimeout(() => {
      fields.forEach((item: any) => {
        remove(item);
      });
    }, 100);
    // console.log("fields 22: ", fields);
    setClearRowsAtom(false);
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
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">서비스 타입</Typography>
                </Stack>
              </TableCell>

              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">분석종류</Typography>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">품명</Typography>
                </Stack>
              </TableCell>

              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">수량</Typography>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">단가</Typography>
                </Stack>
              </TableCell>
              <TableCell align="left" sx={{ paddingX: 2, paddingY: 1 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="subtitle2">공급가액</Typography>
                  <QuestionTooltip sampleCloumn="supplyPrice" />
                </Stack>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {controlledFields.map((field, index) => {
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

      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="center"
        mt={3}
        mb={5}
      >
        <OutlinedButton
          size="small"
          buttonName="+품명 추가"
          onClick={() => handleAddFields()}
        />
      </Stack>
    </>
  );
}
