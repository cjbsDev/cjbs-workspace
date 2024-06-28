import React from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import {
  DataCountResultInfo,
  DataTableBase,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { useRecoilValue } from "recoil";
import { runUpdateHstrUkeyAtom } from "./rogAtom";
import { Box, DialogContent, Grid, Stack } from "@mui/material";
import { ModalContainerProps } from "../../../../../types/modal-container-props";
import useSWR from "swr";
import { fetcher } from "api";

const columns = [
  {
    name: "번호",
    width: "80px",
    sortable: true,
    center: true,
    selector: (row) => row.sampleId,
  },
  {
    name: "샘플명",
    width: "160px",
    allowOverflow: true,
    sortable: true,
    selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
  },
  {
    name: "샘플종류",
    width: "160px",
    allowOverflow: true,
    sortable: true,
    selector: (row) => (row.sampleTypeVal === null ? "-" : row.sampleTypeVal),
  },
  {
    name: "Source",
    width: "160px",
    allowOverflow: true,
    selector: (row) => (row.source === null ? "-" : row.source),
  },
  {
    name: "Depth",
    width: "80px",
    center: true,
    selector: (row) => (row.depthVal === null ? "-" : row.depthVal),
  },
  {
    name: "Taxon",
    width: "80px",
    center: true,
    selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
  },
  {
    name: "RUN",
    width: "100px",
    allowOverflow: true,
    center: true,
    selector: (row) => (row.runList === null ? "-" : row.runList),
  },
  {
    name: "Memo",
    selector: (row) => (row.memo === null ? "-" : row.memo),
  },
  {
    name: "오더 번호",
    center: true,
    selector: (row) => row.orderId,
  },
  {
    name: "연구책임자",
    width: "250px",
    allowOverflow: true,
    selector: (row) => (row.rhpiNm === null ? "-" : row.rhpiNm),
    cell: (row) => (
      <Stack spacing={1.5} direction="row">
        {row.rhpiNm}({row.rhpiEbcEmail})
      </Stack>
    ),
  },
];

const AddDeleteLogModal = (props: ModalContainerProps) => {
  const { onClose, open, modalWidth } = props;
  const getRunUpdateHstrUkey = useRecoilValue(runUpdateHstrUkeyAtom);
  const { data } = useSWR(`/run/sample/log/${getRunUpdateHstrUkey}`, fetcher, {
    suspense: true,
  });
  const { updateSampleLogList, pageInfo } = data;
  // console.log("{}{}{}{}{}{}{}{", updateSampleLogData);

  const handleClose = () => {
    onClose();
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={pageInfo.totalElements} />
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
  }, [pageInfo.totalElements]);

  return (
    <>
      <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
        <ModalTitle onClose={handleClose}>추가된 샘플</ModalTitle>
        <DialogContent sx={{ mt: -3.5 }}>
          <Box sx={{ display: "grid" }}>
            <DataTableBase
              data={updateSampleLogList}
              columns={columns}
              pointerOnHover
              highlightOnHover
              customStyles={dataTableCustomStyles3}
              selectableRows={false}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
            />
          </Box>
        </DialogContent>
        <ModalAction>
          <OutlinedButton
            buttonName="닫기"
            onClick={handleClose}
            color="secondary"
          />
        </ModalAction>
      </ModalContainer>
    </>
  );
};

export default AddDeleteLogModal;
