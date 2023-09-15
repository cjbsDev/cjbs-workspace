import React, { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack, styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, ToggleButton, ToggleButtonGroup,
  Typography,
} from "@mui/material";
import {
  cjbsTheme,
  ConfirmModal,
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
import OrderShotgunGroupDynamicTable from "./OrderShotgunGroupDynamicTable";


const OrderShotgunSampleDynamicTable = (props: any) => {
  // console.log("$$$$$$$$$$", props.serviceType);
  const serviceType = props.serviceType;

  const { watch, control, getValues, formState,setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "sample", // 이름은 폼 데이터에 저장될 필드 이름입니다.
  });
  const { errors } = formState;
  const [showOrderInfoModifyModal, setShowOrderInfoModifyModal] = useState<boolean>(false);
  const [alertModalOpen, setAlertModalOpen] = useState<boolean>(false);

  const handleAlertOpen = () => {
    setAlertModalOpen(true);
  };
  const handleAlertClose = () => {
    setAlertModalOpen(false);
  };

  const handleServiceTypeChange = () => {

    handleAlertClose();
  };

  const orderInfoModifyModalClose = () => {
    setShowOrderInfoModifyModal(false);
  };

  useEffect(() => {
    handleAddFields(1)
  }, [])


  // setValue('count', 1);

  const handleAddFields = (count:any) => {
    console.log("Count~!~!", count);
    // 입력된 수만큼 항목을 추가합니다.
    if(serviceType === 'fs') {
      for (let i = 0; i < count; i++) {
        append({
          sampleNm: "",
          groupNm: "",
          source: "",
          sampleCategoryCc: "",
          memo: "",
          selfQcResultFileId: 0
        });
      }

    } else if (serviceType === 'ao') {
      for (let i = 0; i < count; i++) {
        append({
          sampleNm: "",
          groupNm: "",
          source: "",
          memo: "",
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
      </Stack>
      <TableContainer sx={{ mb: 3, mt: 1, borderTop: "1px solid #000" }}>
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

      {serviceType !== "so" ? (
        <OrderShotgunGroupDynamicTable sampleFields={fields}/>
      ) : ("")}

    </>
  );
};

export default OrderShotgunSampleDynamicTable;
