"use client";
import React, { useEffect, useState, useMemo } from "react";
import { Stack, Grid, Container } from "@mui/material";
import { DataCountResultInfo, DataTableBase } from "cjbsDSTM";
import {useParams} from "next/navigation";
import {useLogList} from "../../../../hooks/useLogList";
import {dataTableCustomStyles} from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";

export default function UpdateLogList() {
  const params = useParams();
  const orshUkey = params.slug[0];

  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);
  const [filters, setFilters] = useState("");
  const [selectedOption, setSelectedOption] = useState<any[]>([]);
  const [selectedRowCnt, setSelectedRowCnt] = useState(0);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [toggledClearRows, setToggleClearRows] = React.useState(false);

  const { data } = useLogList(`orsh/log/${orshUkey}`, filters);
  const totalElements = data.pageInfo.totalElements;

  useEffect(() => {
    setParameter('');
  }, [page, perPage]);

  const setParameter = (addParam: string) => {
    let defaultParam = `page=${page}&size=${perPage}`;
    if(addParam === undefined || addParam === null) {
      defaultParam = `${defaultParam}`;
    } else {
      defaultParam = `${defaultParam}&${addParam}`;
    }
    console.log("defaultParam : ", defaultParam)
    setFilters(defaultParam);
  };

  const handleRowSelected = (rows: any) => {
    setSelectedOption(rows.selectedRows);
    setSelectedRowCnt(rows.selectedCount);
  };

  const columns = useMemo(
    () => [
      {
        name: "변경일",
        selector: (row: { modifiedAt: string }) => row.modifiedAt,
        width: "300px",
      },
      {
        name: "변경자",
        selector: (row: { updatedByNm: string }) => row.updatedByNm,
        width: "200px",
      },
      {
        name: "변경항목",
        selector: (row: { targetColVal: string }) => row.targetColVal,
        width: "200px",
      },
      {
        name: "변경 전",
        selector: (row: { preUpdateValue: string }) => row.preUpdateValue,
        width: "200px",
      },
      {
        name: "변경 후",
        selector: (row: { postUpdateValue: string }) => row.postUpdateValue,
        width: "200px",
      },

    ],
    []
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <Grid container>
        <Grid item xs={6} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2}>
            <DataCountResultInfo
              totalCount={totalElements}
            />
          </Stack>
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, selectedRowCnt]);

  const handlePageChange = (page: number) => {
    console.log("Page", page);
    setPage(page);
    setParameter('');
  };

  const handlePerRowsChange = (newPerPage: number, page: number) => {
    console.log("Row change.....", newPerPage, page);
    setPage(page);
    setPerPage(newPerPage);
    setParameter('');
  };

  return (
    <>
      <Container disableGutters={true} maxWidth="xl" sx={{ pt: 1 }}>
        <DataTableBase
          // title={<Title1 titleName="내 주문내역" />}
          data={data.updateLogList}
          columns={columns}
          // onRowClicked={goDetailPage}
          onSelectedRowsChange={handleRowSelected}
          pointerOnHover
          highlightOnHover
          customStyles={dataTableCustomStyles}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          paginationResetDefaultPage={resetPaginationToggle}
          pagination
          paginationServer
          paginationTotalRows={totalElements}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          clearSelectedRows={toggledClearRows}
          selectableRows={false}
          paginationPerPage={10}
          paginationRowsPerPageOptions={[10, 50, 100]}
        />
      </Container>
    </>
  );
}
