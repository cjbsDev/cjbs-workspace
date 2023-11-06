import React, { useState, useMemo } from "react";
import {
  cjbsTheme,
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter, InputValidation,
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
import { fetcher } from "api";
import MyIcon from "icon/MyIcon";

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
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [perPage, setPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `/code/orsh/prjt/list?page=${pageIndex}&size=${perPage}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const { setValue, clearErrors } = useFormContext();
  // useMemo will only be created once


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
            inputName={'domain'}
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
            // onClick={() => {custSearchModalOpen()}}
          />
        </Stack>
        <Typography variant="body2" color={cjbsTheme.palette.primary.main}>
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
            mb:2
          }}
        >
          <Typography variant="body2">
            검색 결과가 없습니다.
          </Typography>
        </Stack>

        <TableContainer>
          <Table sx={{ minWidth: 500, border:"1px solid #000000"}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{backgroundColor:cjbsTheme.palette.grey["200"]}}>
                  <Typography variant="subtitle2">ID</Typography>
                </TableCell>
                <TableCell sx={{backgroundColor:cjbsTheme.palette.grey["200"]}}>
                  <Typography variant="subtitle2">이름</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  test
                </TableCell>
                <TableCell>
                  test
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
