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
  InputValidation,
  SelectBox,
  UnStyledButton,
} from "cjbsDSTM";
import { useFieldArray, useFormContext } from "react-hook-form";
import MyIcon from "icon/MyIcon";
import ExRow from "../../../orsh-order/in/mtp/(service)/(contents)/ExRow";
import TableHeader from "../../../orsh-order/in/mtp/(service)/(contents)/TableHeader";
import TableNewRows from "./TableNewRows";
import ExcelUploadModal from "../../../orsh-order/in/mtp/(service)/(contents)/ExcelUploadModal";
import { useParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { fileIdValueAtom } from "../../../../../recoil/atoms/fileIdValueAtom";

export default function OrderMTPSampleDynamicTable(props: any) {
  const serviceType = props.serviceType;
  const params = useParams();
  // console.log("params", params.slug[2]);
  const updataYn = params.slug[2];

  const { watch, control, getValues, formState, setValue } = useFormContext();
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
    // console.log("Count~!~!", count);
    // console.log("fileId~!~!", fileId);
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

    if (serviceType === "fs") {
      for (let i = 0; i < count; i++) {
        append({
          sampleNm: "",
          source: "",
          sampleCategoryCc: "",
          anlsTargetGeneCc: "",
          memo: "",
          selfQcResultFileId: fileId,
        });
      }
    } else if (serviceType === "ao") {
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
    } else if (serviceType === "so") {
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

  // const testFunction = () => {
  //   // console.log("Count~!~!", count);
  //   const appendedData = props.detailData.map((item) => ({
  //     sampleNm: item.sampleNm,
  //     source: item.source,
  //     sampleCategoryCc: item.sampleCategoryCc,
  //     anlsTargetGeneCc: item.anlsTargetGeneCc,
  //     selfQcResultFileId: item.selfQcResultFileId,
  //     memo: item.memo,
  //   }));
  //   appendedData.forEach((item) => {
  //     append(item, { focusIndex: 1 });
  //   });
  // };

  // useEffect(() => {
  //   console.log("$$$$$$$$$$$$$$$", props.detailData);
  //   // testFunction();
  //   if(props.detailData.length > 0) {
  //     for (let i = 0; i < props.detailData.length; i++) {
  //       console.log("for~!~!", i);
  //       const resultData = props.detailData[i];
  //       console.log("11111111111111", resultData);
  //       // 이후
  //       if(i === 0 ){
  //         setFileId(resultData.selfQcResultFileId);
  //       }
  //       append({
  //         sampleNm: resultData.sampleNm,
  //         source: resultData.source,
  //         sampleCategoryCc: resultData.sampleCategoryCc,
  //         anlsTargetGeneCc: resultData.anlsTargetGeneCc,
  //         memo: resultData.memo,
  //         selfQcResultFileId: resultData.selfQcResultFileId,
  //       }); // 입력된 수만큼 항목을 추가합니다.
  //       console.log("222222222222222", resultData);
  //     }
  //   }
  //   // remove(props.detailData.length + 1);
  // }, [remove])

  return (
    <>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Typography variant="subtitle1">샘플 리스트</Typography>

        {updataYn === "N" ? (
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
              // handleAddFields={handleAddFields}
              // addExcelDataTableRows={addExcelDataTableRows}
            />
            <InputValidation
              inputName="count"
              type="number"
              sx={{ width: "80px" }}
            />
            <ContainedButton
              buttonName="행 추가"
              size="small"
              color={"secondary"}
              onClick={() => handleAddFields(getValues("count"))}
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
    </>
  );
}
