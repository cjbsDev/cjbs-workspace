import React, { useCallback, useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { DataTableBase, formatBusinessRegNo, OutlinedButton } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";

const InstDataTable = ({ handleClose }) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const { setValue, clearErrors } = useFormContext();
  const { data } = useSWR(`/inst/list?page=${page}&size=${size}`, fetcher, {
    suspense: true,
  });

  console.log("기관 검색", data);

  const listData = data.instList;
  const totalElements = data.pageInfo.totalElements;

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

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: React.SetStateAction<number>, page: any) => {
      setSize(newPerPage);
    },
    [],
  );

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        data={listData}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        // paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={false}
        paginationServer
        paginationTotalRows={totalElements}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        paginationPerPage={15}
        paginationRowsPerPageOptions={[10, 15, 20]}
      />
    </Box>
  );
};

export default InstDataTable;