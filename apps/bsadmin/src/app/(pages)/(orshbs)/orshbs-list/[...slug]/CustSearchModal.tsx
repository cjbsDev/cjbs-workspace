import React, {useState, useMemo, useEffect} from "react";
import {
  cjbsTheme,
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter, Form, InputValidation,
  ModalContainer,
  ModalTitle,
  OutlinedButton, SelectBox,
} from "cjbsDSTM";
import {
  DialogContent,
  InputAdornment,
  Stack,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableContainer,
} from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import {fetcher, GET} from "api";
import MyIcon from "icon/MyIcon";
import SearchInput from "../../../components/KeywordSearch/SearchInput";
import KeywordSearchBtn from "../../../components/KeywordSearch/KeywordSearchBtn";
import {toast} from "react-toastify";

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
  setCodeDataChange: any;
}

const CustSearchModal = ({
  onClose,
  open,
  modalWidth,
  setCodeDataChange,
}: ModalContainerProps) => {
  const [showHideBoolean, setShowHideBoolean] = useState(false);
  const { setValue, getValues, clearErrors } = useFormContext();
  // useMemo will only be created once

  useEffect(() => {
    if(open) {
      setValue("ezbcId", '');
      setValue("domain", 'cj.net');
      setValue("ezbcEmail", '');
      setValue("ezbcFullName", '');
    }
  }, [open])

  const onSubmit = async () => {
    // data: { ezbcId: string; domain: string;
    // const {ezbcId, domain} = data;
    const ezbcId = getValues("ezbcId")
    const domain = getValues("domain")

    try {
      const response = await GET(`/cust/ebc/user/info?email=${ezbcId}@${domain}`);
      //console.log("************", response.data);
      setShowHideBoolean(false);
      if (response.success) {
        setShowHideBoolean(true);
        setValue("ezbcEmail", response.data.email);
        setValue("ezbcFullName", response.data.fullName);

      } else if (response.code == "EBC_USER_NOT_EXIST") {
        toast(response.message);
      } else if (response.code == "URL_CONN_RES_ERROR") {
        toast(response.message);
      } else {
        toast("문제가 발생했습니다. 01");
      }
    } catch (error) {
      console.error("request failed:", error);
      toast("문제가 발생했습니다. 02");
    }
  };

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>계정 검색</ModalTitle>
      <DialogContent sx={{minHeight: 200}}>
        <Typography variant="subtitle1">
          EzBioCloud 계정 검색
        </Typography>
        <Stack direction="row" spacing={0.5} alignItems="flex-start">
          <InputValidation
            inputName="ezbcId"
            required={true}
            errorMessage="EzBioCloud 계정을 입력해주세요."
            placeholder="example"
            sx={{ width: 350 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">@</InputAdornment>
              ),
            }}
          />
          <SelectBox
            required={false}
            inputName="domain"
            defaultOption={false}
            options={[
              { value: "cj.net", optionName: "cj.net" },
              { value: "chunlab.com", optionName: "chunlab.com" },
            ]}
            sx={{ width: 150 }}
          />
          <OutlinedButton
            size="small"
            buttonName="검색"
            // type="submit"
            onClick={() => {onSubmit()}}
          />
        </Stack>
        <Typography variant="body2" color={cjbsTheme.palette.primary.main} mb={2}>
          * 계정 전체를 입력해주세요.
        </Typography>

        <Stack
          direction="row"
          spacing={0}
          alignItems="center"
          justifyContent="center"
          sx={{
            height:100,
            backgroundColor: cjbsTheme.palette.grey["200"],
            mb:2,
            display: showHideBoolean === false ? '' : 'none'
          }}
        >
          <Typography variant="body2">
            검색 결과가 없습니다.
          </Typography>
        </Stack>

        <TableContainer>
          <Table
            sx={{
              minWidth: 500,
              border:"1px solid #000000",
              display: showHideBoolean === false ? 'none' : ''
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{backgroundColor:cjbsTheme.palette.grey["200"]}}>
                  <Typography variant="subtitle2">ID</Typography>
                </TableCell>
                <TableCell sx={{backgroundColor:cjbsTheme.palette.grey["200"]}}>
                  <Typography variant="subtitle2">이름</Typography>
                </TableCell>
                <TableCell sx={{backgroundColor:cjbsTheme.palette.grey["200"]}} width={80}>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <InputValidation
                    inputName="ezbcEmail"
                    required={false}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </TableCell>
                <TableCell>
                  <InputValidation
                    inputName="ezbcFullName"
                    required={false}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </TableCell>
                <TableCell>
                  <OutlinedButton
                    size="small"
                    buttonName="등록"
                    onClick={() => {
                      setValue("rstFileRcpnEmail", getValues("ezbcEmail"));
                      onClose();
                      // clearErrors("prjcNm");
                    }}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </ModalContainer>
  );
};

export default CustSearchModal;
