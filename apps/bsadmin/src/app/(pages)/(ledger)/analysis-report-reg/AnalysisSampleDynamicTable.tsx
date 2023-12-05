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
import {QuestionTooltip} from "../../../components/QuestionTooltip";
import {useRecoilState} from "recoil";
import {groupListDataAtom} from "../../../recoil/atoms/groupListDataAtom";


export default function AnalysisSampleDynamicTable(props) {
// const AnalysisSampleDynamicTable = forwardRef((props: {
//   analysisSearchModalOpen: any;
// }, ref) => {

  // const serviceType = props.serviceType;
  const { analysisSearchModalOpen } = props;
  const params = useParams();
  // console.log("params", params.slug[2]);
  // const updataYn = params.slug[2];

  const { control, getValues, formState, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] = useState<boolean>(false);
  const [selectSampleList, setgroupList] = useRecoilState(groupListDataAtom);

  useEffect(() => {
    callHandleAddFields(selectSampleList);
  }, [selectSampleList]);

  // AnalysisRegView 에서 호출
  const callHandleAddFields = (selectSampleData: any) => {
    console.log("selectSampleData!@#!@#!@#", selectSampleData);

    if(selectSampleData !== undefined && selectSampleData.length > 0) {
      const mergeData = {};
      selectSampleData.map((item) => {
        // console.log(item)
        // srvcType을 배열로 추가 한다
        if(!mergeData.hasOwnProperty("srvcType")) {
          mergeData["srvcType"] = [];
          mergeData["srvcType"].push(item.srvcTypeVal);
        } else { // srvcType이 있을 경우 배열에 중복값을 확인하여 추가한다
          if(!mergeData["srvcType"].includes(item.srvcTypeVal)){
            mergeData["srvcType"].push(item.srvcTypeVal);
          }
        }
        if(!mergeData.hasOwnProperty(item.srvcTypeVal)) {
          mergeData[item.srvcTypeVal] = {};
        }
        if(mergeData[item.srvcTypeVal].hasOwnProperty("sampleUkey")) {
          mergeData[item.srvcTypeVal]["sampleUkey"].push(item.sampleUkey);
        } else {
          mergeData[item.srvcTypeVal]["sampleUkey"] = [];
          mergeData[item.srvcTypeVal]["srvcTypeMc"] = item.srvcTypeMc;
          mergeData[item.srvcTypeVal]["sampleUkey"].push(item.sampleUkey);
        }
      });
      console.log("end: ", mergeData)
      resetTable();
      mergeData["srvcType"].map((item) => {
        console.log("item: ", item)
        append({ //
          addType: "modal",
          srvcTypeMc: mergeData[item]["srvcTypeMc"],
          sampleSize: mergeData[item]["sampleUkey"].length,
          unitPrice: 0,
          supplyPrice: 0,
          dscntRasnCc: "",
        });
      })
    }
  }

  // useImperativeHandle(ref, () => ({
  //   callHandleAddFields
  // }));


  const orderInfoModifyModalClose = () => {
    setShowOrderInfoModifyModal(false);
  };

  const callbackRemove = (index: number) => {
    if (fields.length !== 1) {
      remove(index);
    } else {
      // toast
    }
  };

  const handleAddFields = () => {
    append({ //
      addType: "button",
      srvcTypeMc: "",
      sampleSize: 0,
      unitPrice: 0,
      supplyPrice: 0,
      dscntRasnCc: "",
    });
  };

  const resetTable = () => {
    console.log("fields : ", fields);
    fields.forEach((item: any) => {
      remove(item);
    });
  };

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">분석내역</Typography>
        </Stack>
        {/*<Stack direction="row" alignItems="center" spacing={0.5}>*/}
        {/*  <InputValidation inputName="count" type="number" sx={{width: "72px"}} placeholder="0" />*/}
        {/*  <ContainedButton*/}
        {/*    buttonName="행 추가"*/}
        {/*    size="small"*/}
        {/*    color={"secondary"}*/}
        {/*    onClick={() => handleAddFields(getValues("count"))}*/}
        {/*  />*/}
        {/*</Stack>*/}
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
                  <Typography variant="subtitle2">기준가</Typography>
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
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">할인율</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}>
                <Typography variant="subtitle2">사유</Typography>
              </TableCell>
              <TableCell sx={{ paddingX: 2, paddingY: 1 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, index) => {
              return (
                <TableNewRows
                  key={field.id}
                  field={field}
                  remove={remove}
                  index={index}
                  errors={errors}
                  callbackRemove={callbackRemove}
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

// export default AnalysisSampleDynamicTable;
