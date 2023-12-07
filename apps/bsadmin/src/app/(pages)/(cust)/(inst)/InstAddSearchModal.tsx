import React, { useState, useMemo, useCallback } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
  Title1,
  UnStyledButton,
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

  const [perPage, setPerPage] = useState(30);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(`/inst/list/unRgst`, fetcher, {
    suspense: true,
  });
  // const [totalRows, setTotalRows] = useState(data.pageInfo.totalElements);
  const { setValue } = useFormContext();

  //console.log("Modal data", data.data);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // useMemo will only be created once
  const columns = useMemo(
    () => [
      {
        name: "더존 코드",
        selector: (row) => row.douzoneCode,
      },
      {
        name: "기관명",
        selector: (row) => row.instNm,
      },
      {
        name: "선택",
        cell: (row) => {
          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("instUniqueCodeMc", row.instUniqueCodeMc);
                setValue("instNm", row.instNm);
                // onClose();
                handleClose();
              }}
            />
          );
        },
      },
    ],
    [setValue, handleClose]
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
