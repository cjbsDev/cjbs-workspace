import React, { useState, useMemo, useCallback } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { Chip, DialogContent, Grid, Stack, Typography } from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { fetcher } from "api";

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

// https://dummyjson.com/products?limit=10&skip=10
const AgncSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [perPage, setPerPage] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `/inst/list?page.page=${pageIndex}&page.size=${perPage}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const { setValue, clearErrors } = useFormContext();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // useMemo will only be created once
  const columns = useMemo(
    () => [
      {
        name: "사업자등록번호",
        selector: (row: { brno: number }) => row.brno,
        width: "120px",
      },
      {
        name: "기관명",
        selector: (row: { instNm: string }) => row.instNm,
        width: "320px",
      },
      {
        name: "분류",
        selector: (row: { instTypeVal: string }) => row.instTypeVal,
        width: "150px",
      },
      {
        name: "특성",
        selector: (row: { ftr: string }) => row.ftr,
        width: "250px",
      },
      {
        name: "선택",
        cell: (row: { instUkey: string; instNm: string }) => {
          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("instUkey", row.instUkey);
                setValue("instNm", row.instNm);
                // onClose();
                handleClose();
                clearErrors("instNm");
              }}
            />
          );
        },
        width: "100px",
      },
    ],
    [clearErrors, setValue, handleClose]
  );

  const filteredData = data.instList;

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
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>기관 검색</ModalTitle>
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

export default AgncSearchModal;
