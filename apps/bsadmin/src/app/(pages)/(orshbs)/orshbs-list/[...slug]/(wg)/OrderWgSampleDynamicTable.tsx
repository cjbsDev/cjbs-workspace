import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ContainedButton,
  InputValidation, OutlinedButton,
  SelectBox,
  UnStyledButton,
} from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import MyIcon from "icon/MyIcon";
import ExRow from "../../../orshbs/in/wg/(service)/(contents)/ExRow";
import TableHeader from "../../../orshbs/in/wg/(service)/(contents)/TableHeader";
import TableNewRows from "./TableNewRows";
import ExcelUploadModal from "../../../orshbs/in/wg/(service)/(contents)/ExcelUploadModal";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import {depthCcValueAtom, fileIdValueAtom} from "../../../../../recoil/atoms/fileIdValueAtom";

export default function OrderWgSampleDynamicTable(props: any) {
  const serviceType = props.serviceType;
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];

  const { reset, control, getValues, formState, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] =
    useState<boolean>(false);
  const [fileId, setFileId] = useRecoilState(fileIdValueAtom);

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

  // setValue('count', 1);

  const handleAddFields = (count: any) => {
    if (serviceType === "fs") {
      for (let i = 0; i < count; i++) {
        append({
          depthCc: null,
          groupNm: "",
          memo: "",
          sampleCategoryCc: "",
          sampleNm: "",
          selfQcResultFileId: null,
          source: "",
        });
      }
    } else if (serviceType === "ngs") {
      for (let i = 0; i < count; i++) {
        append({
          depthCc: "",
          memo: "",
          sampleCategoryCc: "",
          sampleNm: "",
          selfQcResultFileId: null,
          source: "",
        });
      }
    } else if (serviceType === "so") {
      for (let i = 0; i < count; i++) {
        append({
          adapter: "",
          depthCc: null,
          idx1frwr: "",
          idx1nm: "",
          idx2nm: "",
          idx2rvrs: "",
          memo: "",
          pltfMc: null,
          sampleNm: "",
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
          { updataYn === 'N' ? (
            <UnStyledButton
              sx={{}}
              buttonName="엑셀 등록"
              startIcon={<MyIcon icon="xls3" size={18} />}
              size="small"
              onClick={() => setShowOrderInfoModifyModal(true)}
            />
          ) : ('')}
        </Stack>
        {updataYn === "N" ? (
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
        ) : (
          ""
        )}
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
                  callbackRemove={callbackRemove}
                  serviceType={serviceType}
                />
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

    </>
  );
}
