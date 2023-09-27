import React, { useMemo, useState } from "react";
import { ModalContainerProps } from "../../../../../types/ModalContainerProps";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ErrorContainer,
  Fallback,
  Form,
  ModalAction,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  RadioGV,
} from "cjbsDSTM";
import {
  Box,
  DialogContent,
  Grid,
  Stack,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { LoadingButton } from "@mui/lab";

interface AnalDtlModalProps extends ModalContainerProps {
  sampleUkeyList: string[];
}

const AnalDtlModal = (props: AnalDtlModalProps) => {
  const { onClose, open, modalWidth, sampleUkeyList } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checked, setChecked] = useState(false);
  const apiUrl = `/anls/inst/sample/list?sampleUkeyList=${sampleUkeyList}`;
  const { data } = useSWR(() => apiUrl, fetcher, {
    suspense: true,
  });

  console.log("분석 내역 보기 Data ==>>", data);

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        selector: (row) => row.sampleId,
      },
      {
        name: "샘플명",
        selector: (row) => row.sampleNm,
      },
      {
        name: "서비스 타입",
        selector: (row) => row.srvcTypeVal,
      },
      {
        name: "접수",
        selector: (row) => row.sampleStatusRes.rcptStatusVal,
        width: "75px",
      },
      {
        name: "QC",
        selector: (row) => row.sampleStatusRes.qcStatusVal,
        width: "75px",
      },
      {
        name: "LIB",
        selector: (row) => row.sampleStatusRes.libStatusVal,
        width: "75px",
      },
      {
        name: "Seq",
        selector: (row) => row.sampleStatusRes.seqStatusVal,
        width: "75px",
      },
      {
        name: "BI",
        selector: (row) => row.sampleStatusRes.biStatusVal,
        width: "75px",
      },
      {
        name: "통보",
        selector: (row) => row.sampleStatusRes.ntfcStatusVal,
        width: "75px",
      },
      {
        name: "분석내역서",
        selector: (row) => (row.isAnlsInst === "Y" ? "생성" : "-"),
      },
    ],
    []
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("sdfsdlfkjlkj", event.target.checked);
      setChecked(event.target.checked);
    };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={data.length} />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <FormControlLabel
            disabled={true}
            control={
              <Checkbox
                size="small"
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={
              <Typography variant="body2">
                분석 내역서가 생성 안된 샘플만 보기
              </Typography>
            }
          />
        </Grid>
      </Grid>
    );
  }, [checked]);

  const handleClose = () => {
    onClose();
  };

  const rowDisabled = (row) => row.isAnlsInst === "N";

  return (
    <ModalContainer onClose={handleClose} open={open} modalWidth={modalWidth}>
      <ModalTitle
        onClose={handleClose}
        desctext="오더 진행이 완료되기 전까지는 각 샘플에 대한 분석 결과를 확인할 수 있으며, 오더 진행이 완료되면 분석 내역서를 등록할 수 있습니다."
      >
        분석 내역
      </ModalTitle>
      <DialogContent>
        <DataTableBase
          data={data}
          columns={columns}
          pointerOnHover
          highlightOnHover
          customStyles={dataTableCustomStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15]}
          selectableRows
          selectableRowDisabled={rowDisabled}
        />
      </DialogContent>
      <ModalAction>
        <OutlinedButton
          buttonName="닫기"
          onClick={handleClose}
          color="secondary"
        />
        <LoadingButton
          loading={isLoading}
          variant="contained"
          type="submit"
          form="sampleBatchChange"
          disabled={true}
        >
          분석 내역서 등록하기
        </LoadingButton>
      </ModalAction>
    </ModalContainer>
  );
};

export default AnalDtlModal;
