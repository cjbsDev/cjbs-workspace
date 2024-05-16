import React, { useMemo, useState } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { Box, Grid, Stack } from "@mui/material";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  OutlinedButton,
} from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../NoDataView";

// 거래처 번호, 거래처, 기관, 선택
const APIPATH = "/agnc/list";
const AgncSearchDataTable = (props: { type: any; onClose: any }) => {
  const { type, onClose } = props;
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  const { data } = useSWR(`${APIPATH}`, fetcher, {
    suspense: true,
  });
  console.log("거래처 검색 ==>>", data);
  const { setValue, clearErrors, resetField } = useFormContext();

  const columns = useMemo(
    () => [
      {
        name: "거래처 번호",
        selector: (row: { agncId: number }) => row.agncId,
        width: "100px",
        center: true,
      },
      {
        name: "거래처",
        selector: (row: { agncNm: string }) => row.agncNm,
        width: "250px",
      },
      {
        name: "기관",
        selector: (row: { instNm: string }) => row.instNm,
        width: "250px",
      },
      {
        name: "선택",
        cell: (row: {
          agncId: string;
          agncUkey: string;
          agncNm: string;
          instNm: string;
          custNm: string;
          ebcEmail: string;
          bsnsMngrNm: string;
          rmnPrePymtPrice: string;
        }) => {
          const {
            agncId,
            agncUkey,
            agncNm,
            instNm,
            custNm,
            ebcEmail,
            bsnsMngrNm,
            rmnPrePymtPrice,
          } = row;
          const agncInstNm = `${row.agncNm}(${row.instNm})`;
          const custEbcNm = `${row.custNm} (${row.ebcEmail})`;

          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("agncNm", agncInstNm);
                setValue("agncUkey", agncUkey);
                setValue("custNm", custEbcNm);
                setValue("bsnsMngrVal", bsnsMngrNm);
                setValue(
                  "rmnPrePymtPrice",
                  rmnPrePymtPrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
                );

                onClose();
                clearErrors("agncNm");
                clearErrors("agncUkey");
                resetField("checkTest7");
              }}
            />
          );
        },
      },
    ],
    [clearErrors, onClose, resetField, setValue, type],
  );

  const filteredData = data.agncList.filter(
    (item) =>
      (item.agncNm &&
        item.agncNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.instNm &&
        item.instNm.toLowerCase().includes(filterText.toLowerCase())),
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
      // paginationServer
      // paginationTotalRows={5}
      // onChangePage={(page, totalRows) => console.log(page, totalRows)}
      // onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
      //   console.log(currentRowsPerPage, currentPage)
      // }
      paginationPerPage={10}
      paginationRowsPerPageOptions={[5, 10, 15]}
      noDataComponent={<NoDataView />}
    />
  );
};

export default AgncSearchDataTable;
