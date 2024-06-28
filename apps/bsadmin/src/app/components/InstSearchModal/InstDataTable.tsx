import React, { useCallback, useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  formatBusinessRegNo,
  OutlinedButton,
} from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { Box, Grid, Stack } from "@mui/material";

const InstDataTable = ({ handleClose }) => {
  // const [page, setPage] = useState<number>(1);
  // const [size, setSize] = useState<number>(15);
  //   ?page=${page}&size=${size}
  const [filterText, setFilterText] = useState("");
  const { setValue, clearErrors } = useFormContext();
  const { data } = useSWR(`/inst/list`, fetcher, {
    suspense: true,
  });

  console.log("기관 검색", data);
  const { instList, pageInfo } = data;
  const { totalElements } = pageInfo;
  // const listData = data.instList;
  // const totalElements = data.pageInfo.totalElements;

  const columns = useMemo(
    () => [
      {
        name: "사업자등록번호",
        // center: true,
        width: "130px",
        selector: (row) => formatBusinessRegNo(row.brno),
      },
      {
        name: "기관명",
        selector: (row) => row.instNm,
      },
      {
        name: "분류",
        width: "80px",
        selector: (row) => row.instTypeVal,
      },
      {
        name: "특성",
        // right: true,
        selector: (row) => row.ftr,
      },
      {
        name: "선택",
        width: "80px",
        center: true,
        cell: (row) => {
          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("rprsNm", row.rprsNm);
                setValue("brno", row.brno);
                setValue("instNm", row.instNm);
                setValue("instUkey", row.instUkey);
                clearErrors(["rprsNm", "brno", "instNm", "instUkey"]);
                handleClose();
              }}
            />
          );
        },
      },
    ],
    [setValue, handleClose],
  );

  const filteredData = instList.filter(
    (item) =>
      (item.brno &&
        item.brno.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.instNm &&
        item.instNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.instTypeVal &&
        item.instTypeVal.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.ftr && item.ftr.toLowerCase().includes(filterText.toLowerCase())),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        // setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={totalElements} />
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
  }, [filterText, totalElements]);

  // const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
  //   setPage(page);
  // }, []);
  //
  // const handlePerRowsChange = useCallback(
  //   (newPerPage: React.SetStateAction<number>, page: any) => {
  //     setSize(newPerPage);
  //   },
  //   [],
  // );

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        data={filteredData}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        // paginationServer
        // paginationTotalRows={totalElements}
        // onChangeRowsPerPage={handlePerRowsChange}
        // onChangePage={handlePageChange}
        paginationPerPage={15}
        paginationRowsPerPageOptions={[10, 15, 20]}
      />
    </Box>
  );
};

export default InstDataTable;
