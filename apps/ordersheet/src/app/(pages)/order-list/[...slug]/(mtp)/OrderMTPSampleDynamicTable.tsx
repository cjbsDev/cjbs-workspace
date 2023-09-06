import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  InputValidation,
  SelectBox,
  UnStyledButton,
} from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import MyIcon from "icon/MyIcon";
import axios from "axios";
import ExRow from "@app/(pages)/order/ExRow";
import TableHeader from "@app/(pages)/order/TableHeader";
import TableNewRows from "./TableNewRows";
import ExcelUploadModal from "@app/(pages)/order/ExcelUploadModal";
import {useParams} from "next/navigation";
import dynamic from "next/dynamic";

// function getUserAccount() {
//   return axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=sample&midValue=category`
//   );
// }
//
// function getUserPermissions() {
//   return axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/code/list/shortly/value?topValue=sample&midValue=genome`
//   );
// }
//
//
// let acct: any;
// let perm: any;
// Promise.all([getUserAccount(), getUserPermissions()]) // Promise, then 사용
//   .then(function (results) {
//     // 응답 결과를 results 배열로 받아서
//     acct = results[0].data.data; // 각각의 결과를 acct와 perm에 저장
//     perm = results[1].data.data;
//   });

export default function OrderMTPSampleDynamicTable(props: any) {
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];
  console.log("props", props.detailData);
  console.log("props", props.detailData.length);
  const detailData = props.detailData;

  const { watch, control, getValues, formState,setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] = useState<boolean>(false);
  const [fileId, setFileId] = useState(null);
  const orderInfoModifyModalClose = () => {
    setShowOrderInfoModifyModal(false);
  };

  const callbackRemove = (index:number) => {
    if(fields.length !== 1){
      remove(index);
    } else {
      // toast
    }
  };

  // setValue('count', 1);

  const handleAddFields = (count:any) => {
    // console.log("Count~!~!", count);
    for (let i = 0; i < count; i++) {
      append({
        sampleNm: "",
        source: "",
        sampleCategoryCc: "",
        anlsTargetGeneCc: "",
        memo: "",
        selfQcResultFileId: fileId,
      }); // 입력된 수만큼 항목을 추가합니다.
    }
  };



  useEffect(() => {
    console.log("$$$$$$$$$$$$$$$", props.detailData);
    if(props.detailData.length > 0) {
      for (let i = 0; i < props.detailData.length; i++) {
        console.log("for~!~!", i);
        const resultData = props.detailData[i];
        console.log("11111111111111", resultData);
        // 이후
        if(i === 0 ){
          setFileId(resultData.selfQcResultFileId);
        }
        append({
          sampleNm: resultData.sampleNm,
          source: resultData.source,
          sampleCategoryCc: resultData.sampleCategoryCc,
          anlsTargetGeneCc: resultData.anlsTargetGeneCc,
          memo: resultData.memo,
          selfQcResultFileId: resultData.selfQcResultFileId,
        }); // 입력된 수만큼 항목을 추가합니다.
        console.log("222222222222222", resultData);
      }
    }
    remove(props.detailData.length + 1);
  }, [])

  console.log("&&&&&&&&&&&&&&&&&&&&&&", fields);

  return (
    <>
      <Stack direction="row">
        { updataYn === 'N' ? (
          <>
            <UnStyledButton
              sx={{}}
              buttonName="엑셀 등록"
              startIcon={<MyIcon icon="xls3" size={18} />}
              size="small"
              onClick={() => setShowOrderInfoModifyModal(true)}
            />
            <ExcelUploadModal
              onClose={orderInfoModifyModalClose}
              open={showOrderInfoModifyModal}
              modalWidth={800}
              append={append}
              // handleAddFields={handleAddFields}
              // addExcelDataTableRows={addExcelDataTableRows}
            />
            <InputValidation inputName="count" type="number" sx={{width: "80px"}} />
            <ContainedButton
              buttonName="행 추가"
              size="small"
              color={"secondary"}
              onClick={() => handleAddFields(getValues("count"))}
            />
          </>
        ) : (
          ''
        )}

      </Stack>
      <TableContainer sx={{ mb: 5, mt: 1, borderTop: "1px solid #000" }}>
        <Table>
          <TableHeader />
          <TableBody>
            <ExRow />
            {fields.map((field, index) => {
              console.log("FFFFFFFF", field, index)
              return (
                <TableNewRows
                  key={field.id}
                  field={field}
                  remove={remove}
                  index={index}
                  // acct={acct}
                  // perm={perm}
                  errors={errors}
                  callbackRemove={callbackRemove}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};