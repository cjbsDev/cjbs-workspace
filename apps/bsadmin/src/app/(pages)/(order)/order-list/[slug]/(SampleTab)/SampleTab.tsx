import React, { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import fetcher from "../../../../../func/fetcher";
import {
  ContainedButton,
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ErrorContainer,
  Fallback,
  FileDownloadBtn,
  OutlinedButton,
} from "cjbsDSTM";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import MyIcon from "icon/myIcon";
import { useRouter } from "next-nprogress-bar";
import dynamic from "next/dynamic";

const LazySampleInfoModal = dynamic(() => import("./SampleInfoModal"), {
  ssr: false,
});
const LazySampleAddModal = dynamic(() => import("./SampleAddModal"), {
  ssr: false,
});
const SampleTab = () => {
  const [filterText, setFilterText] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // [샘플 정보] 모달
  const [showSampleInfoModal, setShowSampleInfoModal] = useState({
    isShow: false,
    sampleUkey: "",
  });
  // [샘플 추가] 모달
  const [showSampleAddModal, setShowSampleAddModal] = useState(false);

  const params = useParams();
  const orderUkey = params.slug;
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/order/${orderUkey}/sample/list`,
    fetcher,
    {
      suspense: true,
    }
  );
  const sampleList = data.data;
  // console.log("SAMPLE TAB LIST", sampleList);

  const columns = useMemo(
    () => [
      {
        name: "샘플번호",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleId,
      },
      {
        name: "샘플명",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.sampleNm === null ? "-" : row.sampleNm),
      },
      {
        name: "샘플종류",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) =>
          row.sampleStatusVal === null ? "-" : row.sampleStatusVal,
      },
      {
        name: "Source",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.source === null ? "-" : row.source),
      },
      {
        name: "Depth(GB)",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.depth === null ? "-" : row.depth),
      },
      {
        name: "Taxon",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) => (row.taxonVal === null ? "-" : row.taxonVal),
      },
      {
        name: "RUN",
        // width: "120px",
        sortable: false,
        center: true,
        selector: (row) =>
          row.runList.length === 0 ? "-" : row.runList.map((item) => item),
      },
      {
        name: "접수",
        width: "105px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleStatusRes.rcptStatusVal,
        cell: (row) => {
          const { sampleStatusRes } = row;
          const { rcptStatusVal } = sampleStatusRes;
          return (
            <Chip
              data-tag="allowRowEvents"
              variant="outlined"
              color="primary"
              label={rcptStatusVal}
              size="small"
            />
          );
        },
      },
      {
        name: "QC",
        width: "105px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleStatusRes.qcStatusVal,
        cell: (row) => {
          const { sampleStatusRes } = row;
          const { qcStatusVal } = sampleStatusRes;
          return (
            <Chip
              data-tag="allowRowEvents"
              variant="outlined"
              color="secondary"
              label={qcStatusVal}
              size="small"
              sx={{ color: "black" }}
            />
          );
        },
      },
      {
        name: "LIB",
        width: "105px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleStatusRes.libStatusVal,
        cell: (row) => {
          const { sampleStatusRes } = row;
          const { libStatusVal } = sampleStatusRes;
          return (
            <Chip
              data-tag="allowRowEvents"
              variant="outlined"
              color="error"
              label={libStatusVal}
              size="small"
            />
          );
        },
      },
      {
        name: "Seq",
        width: "105px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleStatusRes.seqStatusVal,
        cell: (row) => {
          const { sampleStatusRes } = row;
          const { seqStatusVal } = sampleStatusRes;
          return (
            <Chip
              data-tag="allowRowEvents"
              variant="outlined"
              color="secondary"
              label={seqStatusVal}
              size="small"
              sx={{ color: "black" }}
            />
          );
        },
      },
      {
        name: "BI",
        width: "105px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleStatusRes.biStatusVal,
        cell: (row) => {
          const { sampleStatusRes } = row;
          const { biStatusVal } = sampleStatusRes;
          return (
            <Chip
              data-tag="allowRowEvents"
              variant="outlined"
              color="secondary"
              label={biStatusVal}
              size="small"
              sx={{ color: "black" }}
            />
          );
        },
      },
      {
        name: "통보",
        width: "105px",
        sortable: false,
        center: true,
        selector: (row) => row.sampleStatusRes.ntfcStatusVal,
        cell: (row) => {
          const { sampleStatusRes } = row;
          const { ntfcStatusVal } = sampleStatusRes;
          return (
            <Chip
              data-tag="allowRowEvents"
              variant="outlined"
              color="secondary"
              label={ntfcStatusVal === null ? "-" : ntfcStatusVal}
              size="small"
              sx={{ color: "black" }}
            />
          );
        },
      },
      {
        name: "분석내역서",
        width: "100px",
        sortable: false,
        center: true,
        selector: (row) =>
          row.sampleStatusVal === null ? "-" : row.sampleStatusVal,
      },
    ],
    []
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <DataCountResultInfo totalCount={sampleList.length} />
            {/*<Link href="/order-reg">*/}
            {/*  <ContainedButton buttonName="오더 등록" size="small" />*/}
            {/*</Link>*/}
            <ContainedButton
              buttonName="샘플 추가"
              size="small"
              onClick={() => setShowSampleAddModal(true)}
            />
            <ContainedButton buttonName="분석 내역 보기" size="small" />
            <OutlinedButton
              buttonName="샘플 정보 일괄 변경"
              size="small"
              color="secondary"
              sx={{ color: "black" }}
            />
            <OutlinedButton
              buttonName="실험 진행 단계 변경"
              size="small"
              color="secondary"
              sx={{ color: "black" }}
            />
          </Stack>
        </Grid>
        <Grid item xs={7} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 1.5 }}
            alignItems="center"
          >
            <FileDownloadBtn
              exportUrl={`${process.env.NEXT_PUBLIC_API_URL}/order/list/download`}
              iconName="xls3"
            />

            <DataTableFilter
              onFilter={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setFilterText(e.target.value)}
              onClear={handleClear}
              filterText={filterText}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, checked]);

  const goDetailModal = useCallback((row: any) => {
    const sampleUkey = row.sampleUkey;
    setShowSampleInfoModal({
      ...showSampleInfoModal,
      sampleUkey: sampleUkey,
      isShow: true,
    });
  }, []);

  const handleSelectedRowChange = ({ selectedRows }: any) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    console.log("Selected Rows: ", selectedRows);
  };

  const handleSampleInfoModalClose = () => {
    setShowSampleInfoModal({
      ...showSampleInfoModal,
      isShow: false,
    });
  };

  const handleSampleAddModalClose = () => {
    setShowSampleAddModal(false);
  };

  return (
    <>
      <DataTableBase
        data={sampleList}
        columns={columns}
        onRowClicked={goDetailModal}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows
        onSelectedRowsChange={handleSelectedRowChange}
        pagination={false}
      />

      {/* 샘플Info 모달 */}
      {showSampleInfoModal.isShow && (
        <LazySampleInfoModal
          onClose={handleSampleInfoModalClose}
          open={showSampleInfoModal.isShow}
          sampleUkey={showSampleInfoModal.sampleUkey}
          modalWidth={800}
        />
      )}

      {/* 샘플Add 모달 */}
      <LazySampleAddModal
        onClose={handleSampleAddModalClose}
        open={showSampleAddModal}
        modalWidth={800}
      />
      {/*{showSampleInfoModal.isShow && (*/}
      {/*  */}
      {/*)}*/}
    </>
  );
};

export default SampleTab;
