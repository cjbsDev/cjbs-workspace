import React, { useCallback, useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { DataTableBase, OutlinedButton } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";

const AgncDataTable = ({ handleClose }) => {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(15);
  const { setValue } = useFormContext();
  const { data } = useSWR(`/agnc/list??page=${page}&size=${size}`, fetcher, {
    suspense: true,
  });

  console.log("거래처 검색", data);

  const listData = data.agncList;
  const totalElements = data.pageInfo.totalElements;

  const columns = useMemo(
    () => [
      {
        name: "거래처번호",
        center: true,
        width: "100px",
        selector: (row) => row.agncId,
      },
      {
        name: "거래처",
        selector: (row) => row.agncNm,
      },
      {
        name: "기관",
        selector: (row) => row.instNm,
      },
      {
        name: "남은금액",
        right: true,
        selector: (row) => row.rmnPrice,
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
                setValue("agncUkey", row.agncUkey);
                setValue("agncNm", row.agncNm);
                setValue("instNm", row.instNm);
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
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20]}
      />
    </Box>
  );
};

export default AgncDataTable;
