import React, { useCallback, useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  OutlinedButton,
} from "cjbsDSTM";
import { Grid, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";

const ProjectSearchDataTable = (props: { onClose: () => void }) => {
  const { onClose } = props;
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [perPage, setPerPage] = useState(10);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `/code/orsh/prjt/list?page=${pageIndex}&size=${perPage}`,
    fetcher,
    {
      suspense: true,
    },
  );
  const { setValue, clearErrors } = useFormContext();
  const filteredData = data.codeList;

  console.log("rhkekhkehrkehrkher", data);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const columns = useMemo(
    () => [
      {
        name: "코드",
        selector: (row: { value: string }) => row.value,
        width: "150px",
      },
      {
        name: "과제명",
        selector: (row: { optionName: string }) => row.optionName,
        width: "550px",
      },
      {
        name: "연구갯수",
        selector: (row: { prjtDetailCnt: string }) => row.prjtDetailCnt,
        width: "100px",
      },
      // {
      //   name: "사용여부",
      //   selector: (row: { isPrjtSelect: string }) => row.isPrjtSelect,
      //   width: "50px",
      // },
      {
        name: "선택",
        cell: (row: any) => {
          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("prjtCodeMc", row.value);
                setValue("prjcNm", row.optionName);
                // onClose();
                handleClose();
                clearErrors("prjcNm");
                clearErrors("prjtCodeMc");
              }}
              disabled={row.isPrjtSelect === "N" ? true : false}
            />
          );
        },
        width: "100px",
      },
    ],
    [setValue, clearErrors, handleClose],
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
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={data.pageInfo.totalElements} />
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
  }, [filterText, resetPaginationToggle, data.pageInfo.totalElements]);

  return (
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
  );
};

export default ProjectSearchDataTable;
