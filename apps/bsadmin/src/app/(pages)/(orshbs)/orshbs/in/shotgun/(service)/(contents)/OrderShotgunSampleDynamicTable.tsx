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
import ExRow from "./ExRow";
import TableHeader from "./TableHeader";
import TableNewRows from "./TableNewRows";
import ExcelUploadModal from "./ExcelUploadModal";

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
// let acct: any;
// let perm: any;
// Promise.all([getUserAccount(), getUserPermissions()]) // Promise, then 사용
//   .then(function (results) {
//     // 응답 결과를 results 배열로 받아서
//     acct = results[0].data.data; // 각각의 결과를 acct와 perm에 저장
//     perm = results[1].data.data;
//   });

const OrderShotgunSampleDynamicTable = (props: any) => {
  // console.log("$$$$$$$$$$", props.serviceType);
  const serviceType = props.serviceType;

  const { watch, control, getValues, formState,setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] =
    useState<boolean>(false);
  const orderInfoModifyModalClose = () => {
    setShowOrderInfoModifyModal(false);
  };

  useEffect(() => {
    handleAddFields(1)
  }, [])


  const handleAddFields = (count:any) => {
    console.log("Count~!~!", count);
    // 입력된 수만큼 항목을 추가합니다.
    if(serviceType === 'fs') {
      for (let i = 0; i < count; i++) {
        append({
          groupNm: "",
          sampleNm: "",
          source: "",
          sampleCategoryCc: "",
          memo: "",
        });
      }

    } else if (serviceType === 'ngs') {
      for (let i = 0; i < count; i++) {
        append({
          memo: "",
          sampleCategoryCc: "",
          sampleNm: "",
          source: "",
        });
      }

    } else if (serviceType === 'so') {
      for (let i = 0; i < count; i++) {
        append({
          idx1frwr: "",
          idx1nm: "",
          idx2nm: "",
          idx2rvrs: "",
          memo: "",
          sampleNm: "",
          adapter: "",
        });
      }
    }

  };

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">샘플 리스트</Typography>
          <UnStyledButton
            sx={{}}
            buttonName="엑셀 등록"
            startIcon={<MyIcon icon="xls3" size={18} />}
            size="small"
            onClick={() => setShowOrderInfoModifyModal(true)}
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <ExcelUploadModal
            onClose={orderInfoModifyModalClose}
            open={showOrderInfoModifyModal}
            modalWidth={800}
            append={append}
            serviceType={serviceType}
          />
          <InputValidation inputName="count" type="number" sx={{width: "72px"}} placeholder="0" />
          <ContainedButton
            buttonName="행 추가"
            size="small"
            color={"secondary"}
            onClick={() => handleAddFields(getValues("count"))}
          />
        </Stack>
      </Stack>
      <TableContainer sx={{ mb: 5, mt: 1, borderTop: "1px solid #000" }}>
        <Table>
          <TableHeader serviceType={serviceType} />
          <TableBody>
            <ExRow serviceType={serviceType} />
            {fields.map((field, index) => {
              return (
                <TableNewRows
                  key={field.id}
                  field={field}
                  remove={remove}
                  index={index}
                  errors={errors}
                  serviceType={serviceType}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default OrderShotgunSampleDynamicTable;
