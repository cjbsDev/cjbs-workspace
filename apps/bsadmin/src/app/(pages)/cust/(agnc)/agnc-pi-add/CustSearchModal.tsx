import React, { useState, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ExcelDownloadButton,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { Box, DialogActions, DialogContent, Grid, Stack } from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const CustSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [perPage, setPerPage] = useState(30);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `http://cjbs-it-alb-980593920.ap-northeast-2.elb.amazonaws.com:9000/cust/list?page=${pageIndex}&size=${perPage}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const { setValue } = useFormContext();

  //console.log("Modal data", data.data);

  // [고객] 컬럼세팅
  const columns = useMemo(
    () => [
      {
        name: "고객 번호",
        selector: (row: { ebcUid: number }) => row.ebcUid,
        width: "100px",
      },
      {
        name: "아이디",
        selector: (row: { ebcEmail: string }) => row.ebcEmail,
      },
      {
        name: "이름",
        selector: (row: { custNm: string }) => row.custNm,
        width: "100px",
      },

      {
        name: "소속 거래처(PI)",
        cell: (row: { agncNm: any; instNm: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.agncNm ?? "-"}</Box>
              {row.instNm && <Box>({row.instNm})</Box>}
            </Stack>
          </>
        ),
        minWidth: "150px",
      },
      {
        name: "선택",
        cell: (row: { custUkey: any; custNm: any; ebcEmail: any }) => {
          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("custUkey", row.custUkey);
                setValue("custNm", row.custNm);
                setValue("ebcEmail", row.ebcEmail);
                onClose();
              }}
            />
          );
        },
      },
    ],
    []
  );

  console.log("data.data.custList", data.data.custList);
  const filteredData = data.data.custList;

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
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo
              totalCount={data.data.pageInfo.totalElements}
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
  }, [filterText, resetPaginationToggle]);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>고객 검색</ModalTitle>
      <DialogContent>
        <DataTableBase
          data={filteredData}
          columns={columns}
          pointerOnHover
          highlightOnHover
          customStyles={dataTableCustomStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          paginationResetDefaultPage={resetPaginationToggle}
          selectableRows={false}
          paginationServer
          paginationTotalRows={5}
          onChangePage={(page, totalRows) => console.log(page, totalRows)}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
            console.log(currentRowsPerPage, currentPage)
          }
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15]}
        />
      </DialogContent>
    </ModalContainer>
  );
};

export default CustSearchModal;