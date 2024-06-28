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


const OrderWgSampleDynamicTable = (props: any) => {
  // console.log("$$$$$$$$$$", props.serviceType);
  const serviceType = props.serviceType;

  const { reset, control, getValues, formState,setValue } = useFormContext();
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
          isRdnaIdnt16S: "N",
          locusTagPrfx: "",
          memo: "",
          sampleCategoryCc: "",
          sampleNm: "",
          txmy: "",
        });
      }

    } else if (serviceType === 'ngs') {
      for (let i = 0; i < count; i++) {
        append({
          isRdnaIdnt16S: "N",
          locusTagPrfx: "",
          memo: "",
          sampleCategoryCc: "",
          sampleNm: "",
          txmy: "",
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

  // 모든 필드를 삭제하는 함수
  const deleteAllFields = () => {
    reset({
      ...getValues(),
      sample: []
    });
  };

  // 필드 초기화 및 기본 1개 생성 함수
  const deleteAndOneRowFields = () => {
    deleteAllFields()
    handleAddFields(1);
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
            deleteAllFields={deleteAllFields}
          />
          {/*<InputValidation inputName="count" type="number" sx={{width: "72px"}} placeholder="0" />*/}
          <ContainedButton
            buttonName="초기화"
            startIcon={<MyIcon icon="trash" size={18} />}
            size="small"
            color={"secondary"}
            onClick={deleteAndOneRowFields}
          />
          <ContainedButton
            buttonName="행 추가"
            startIcon={<MyIcon icon="plus" size={18} />}
            size="small"
            color={"primary"}
            // onClick={() => handleAddFields(getValues("count"))}
            onClick={() => handleAddFields(1)}
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

export default OrderWgSampleDynamicTable;
