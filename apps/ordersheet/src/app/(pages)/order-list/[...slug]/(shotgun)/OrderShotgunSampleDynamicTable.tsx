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
import ExRow from "@app/(pages)/order/shotgun/(service)/(contents)/ExRow";
import TableHeader from "@app/(pages)/order/shotgun/(service)/(contents)/TableHeader";
import TableNewRows from "./TableNewRows";
import ExcelUploadModal from "@app/(pages)/order/shotgun/(service)/(contents)/ExcelUploadModal";
import {useParams} from "next/navigation";
import dynamic from "next/dynamic";
import {useRecoilState} from "recoil";
import {fileIdValueAtom} from "@app/recoil/atoms/fileIdValueAtom";
import {depthCcValueAtom} from "@app/recoil/atoms/depthCcValueAtom";
import OrderShotgunGroupDynamicTable from "./OrderShotgunGroupDynamicTable";


export default function OrderShotgunSampleDynamicTable(props:any) {
  const serviceType = props.serviceType;
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];

  const { watch, control, getValues, formState,setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] = useState<boolean>(false);
  const [fileId, setFileId] = useRecoilState(fileIdValueAtom);
  const [depthCc, setDepthCc] = useRecoilState(depthCcValueAtom);
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
    console.log("fileId~!~!", fileId);
    // for (let i = 0; i < count; i++) {
    //   append({
    //     sampleNm: "",
    //     source: "",
    //     sampleCategoryCc: "",
    //     anlsTargetGeneCc: "",
    //     memo: "",
    //     selfQcResultFileId: fileId,
    //   }); // 입력된 수만큼 항목을 추가합니다.
    // }

    if(serviceType === 'fs') {
      for (let i = 0; i < count; i++) {
        append({
          sampleNm: "",
          groupNm: "",
          source: "",
          sampleCategoryCc: "",
          memo: "",
          depthCc: depthCc,
          selfQcResultFileId: fileId,
        });
      }

    } else if (serviceType === 'ao') {
      for (let i = 0; i < count; i++) {
        append({
          anlsTargetGeneCc: "",
          frwrPrimer: "",
          memo: "",
          pltfMc: fileId,
          rvrsPrimer: "",
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
        });
      }
    }
  };

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="subtitle1">샘플 리스트</Typography>
        { updataYn === 'N' ? (
          <Stack direction="row" alignItems="center" spacing={2}>
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
              serviceType={serviceType}
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
          </Stack>
        ) : (
          ''
        )}

      </Stack>
      <TableContainer sx={{ mb: 5, mt: 1, borderTop: "1px solid #000" }}>
        <Table>
          <TableHeader serviceType={serviceType}/>
          <TableBody>
            <ExRow serviceType={serviceType}/>
            {fields.map((field, index) => {
              // console.log("FFFFFFFF", field, index)
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

      <OrderShotgunGroupDynamicTable sampleFields={fields}/>

    </>
  );
};