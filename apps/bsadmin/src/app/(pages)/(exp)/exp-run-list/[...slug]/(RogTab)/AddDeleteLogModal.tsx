import React from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import {
  cjbsTheme,
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  SingleDatePicker,
  TD,
  TH,
} from "cjbsDSTM";
import { useRecoilValue } from "recoil";
import { updateSampleLogListAtom } from "./rogAtom";
import {
  Box,
  DialogContent,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ModalContainerProps } from "../../../../../types/ModalContainerProps";
import { toast } from "react-toastify";
import MyIcon from "icon/MyIcon";
import KeywordSearch from "../../../../../components/KeywordSearch";

const columns = [
  {
    name: "샘플 번호",
    // width: "80px",
    sortable: true,
    selector: (row) => row.sampleId,
  },
  {
    name: "샘플명",
    sortable: true,
    selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
  },
  {
    name: "샘플종류",
    sortable: true,
    selector: (row) => (row.sampleTypeVal === null ? "-" : row.sampleTypeVal),
  },
  {
    name: "Source",
    selector: (row) => (row.source === null ? "-" : row.source),
  },
  {
    name: "Depth",
    selector: (row) => (row.depthVal === null ? "-" : row.depthVal),
  },
  {
    name: "Taxon",
    selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
  },
  {
    name: "RUN No",
    selector: (row) => (row.runList === null ? "-" : row.runList),
  },
  {
    name: "Memo",
    selector: (row) => (row.memo === null ? "-" : row.memo),
  },
  {
    name: "오더 번호",
    selector: (row) => row.orderId,
  },
  {
    name: "연구책임자",
    selector: (row) => (row.rhpiNm === null ? "-" : row.rhpiNm),
    cell: (row) => (
      <>
        {row.rhpiNm}
        <br />({row.rhpiEbcEmail})
      </>
    ),
  },
];

const AddDeleteLogModal = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const getUpdateSampleLogList = useRecoilValue(updateSampleLogListAtom);
  const updateSampleLogData = getUpdateSampleLogList.updateSampleLogList;
  const totalElements = getUpdateSampleLogList.pageInfo;
  console.log("{}{}{}{}{}{}{}{", updateSampleLogData);

  const handleClose = () => {
    onClose();
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={totalElements.totalElements} />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          ></Stack>
        </Grid>
      </Grid>
    );
  }, [getUpdateSampleLogList]);

  return (
    <>
      <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
        <ModalTitle onClose={handleClose}>추가된 샘플</ModalTitle>
        <DialogContent sx={{ mt: -3.5 }}>
          <DataTableBase
            data={updateSampleLogData}
            columns={columns}
            // onRowClicked={goDetailModal}
            pointerOnHover
            highlightOnHover
            customStyles={dataTableCustomStyles3}
            selectableRows={false}
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            // selectableRows
            // onSelectedRowsChange={handleSelectedRowChange}
            // clearSelectedRows={isClear}
            // selectableRowsVisibleOnly={true}
            // pagination
            // paginationServer
            // paginationTotalRows={totalElements}
            // onChangeRowsPerPage={handlePerRowsChange}
            // onChangePage={handlePageChange}
          />
        </DialogContent>
        <ModalAction>
          <OutlinedButton
            buttonName="닫기"
            onClick={handleClose}
            color="secondary"
          />
          {/*<LoadingButton*/}
          {/*  // loading={isLoading}*/}
          {/*  variant="contained"*/}
          {/*  type="submit"*/}
          {/*  form="exPrgsChng"*/}
          {/*>*/}
          {/*  저장*/}
          {/*</LoadingButton>*/}
        </ModalAction>
      </ModalContainer>
    </>
  );
};

export default AddDeleteLogModal;
