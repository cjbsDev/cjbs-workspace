import React, { useMemo } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { DataCountResultInfo, DataTableBase } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const AnalDtlDataTable = (props: {
  sampleUkeyList: any;
  checked: any;
  setChecked: any;
}) => {
  const { sampleUkeyList, checked, setChecked } = props;

  console.log("SampleUkeyList <<<<==>>>", sampleUkeyList);

  const params = useParams();
  const uKey = params.slug;
  const apiUrl = `/anls/itst/${uKey}/sample/list?sampleUkeyList=${sampleUkeyList}`;
  const { data } = useSWR(() => apiUrl, fetcher, {
    suspense: true,
  });

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
  }, [checked, data.length, setChecked]);

  const rowDisabled = (row) => row.isAnlsInst === "N";

  return (
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
  );
};

export default AnalDtlDataTable;
