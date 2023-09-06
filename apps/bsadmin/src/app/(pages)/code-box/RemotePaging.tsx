import React, { useCallback, useMemo, useState } from "react";
import { useList } from "../../hooks/useList";
import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import MyIcon from "icon/MyIcon";
import Dayjs from "dayjs";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { DataTableBase, Title1 } from "cjbsDSTM";

const RemotePaging = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  // ListAPI Call
  const { data } = useList("cust", page, perPage);
  const filteredData = data.custList;
  const totalElements = data.pageInfo.totalElements;
  const columns = useMemo(
    () => [
      {
        name: "고객 번호",
        cell: (row: { ebcUid: number; agncUkey: string }) => (
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            // useFlexGap
            // flexWrap="wrap"
          >
            <Box data-tag="allowRowEvents">{row.ebcUid} </Box>
            {row.agncUkey == null && (
              <MyIcon
                data-tag="allowRowEvents"
                icon="exclamation-triangle-fill"
                size={20}
                color="#FFAB33"
              />
            )}
          </Stack>
        ),
        width: "200px",
      },

      {
        name: "아이디",
        selector: (row: { ebcEmail: string }) => row.ebcEmail,
        width: "200px",
      },
      {
        name: "이름",
        selector: (row: { custNm: string }) => row.custNm,
        width: "150px",
      },

      {
        name: "거래처(PI)",
        cell: (row: { instNm: any; agncNm: any }) => (
          <>
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
              data-tag="allowRowEvents"
            >
              <Box data-tag="allowRowEvents">{row.agncNm}</Box>
              {row.instNm && (
                <Box data-tag="allowRowEvents">({row.instNm})</Box>
              )}
            </Stack>
          </>
        ),
        minWidth: "300px",
      },

      {
        name: "마지막 수정",
        width: "150px",
        selector: (row: { modifiedAt: any }) =>
          row.modifiedAt && Dayjs(row.modifiedAt).format("YYYY-MM-DD"),
      },

      {
        name: "메모",
        cell: (row: { memo: string }) => {
          return (
            row.memo !== null &&
            row.memo !== "" && (
              <Tooltip title={row.memo} arrow>
                <IconButton size="small">
                  <MyIcon icon="memo" size={24} />
                </IconButton>
              </Tooltip>
            )
          );
        },
        width: "80px",
      },
    ],
    []
  );

  const handlePageChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: number, page: number) => {
      setPage(page);
      setPerPage(newPerPage);
    },
    []
  );

  return (
    <DataTableBase
      title={<Title1 titleName="고객 관리" />}
      data={filteredData}
      columns={columns}
      // onRowClicked={goDetailPage}
      // onSelectedRowsChange={handleRowSelected}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      // subHeader
      // subHeaderComponent={subHeaderComponentMemo}
      // paginationResetDefaultPage={resetPaginationToggle}
      paginationPerPage={10}
      pagination
      paginationServer
      paginationTotalRows={totalElements}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
    />
  );
};

export default RemotePaging;
