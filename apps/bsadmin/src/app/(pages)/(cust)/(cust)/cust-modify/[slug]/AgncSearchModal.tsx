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

const AgncSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [perPage, setPerPage] = useState(20);

  const { data: getData } = useSWR(
    `/agnc/list?page.page=${pageIndex}&page.size=${perPage}`,
    fetcher,
    {
      suspense: true,
    },
  );
  // const [totalRows, setTotalRows] = useState(data.pageInfo.totalElements);
  const { setValue } = useFormContext();

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // useMemo will only be created once
  const columns = useMemo(
    () => [
      {
        name: "사업자등록번호",
        selector: (row) => row.agncId,
      },
      {
        name: "분류",
        selector: (row) => row.agncNm,
      },
      {
        name: "특성",
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
                setValue("agncUkey", row.agncUkey);
                setValue("agncNm", row.agncNm);
                // onClose();
                handleClose();
              }}
            />
          );
        },
      },
    ],
    [setValue, handleClose],
  );

  const filteredData = getData.agncList.filter(
    (item) =>
      item.agncNm &&
      item.agncNm.toLowerCase().includes(filterText.toLowerCase()),
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    console.log("getData.pageInfo", getData.pageInfo);

    return (
      <Grid container>
        <Grid item xs={5} sx={{ pt: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <DataCountResultInfo totalCount={getData.pageInfo.totalElements} />
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
  }, [filterText, resetPaginationToggle, getData.pageInfo]);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>거래처 검색</ModalTitle>
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
          paginationTotalRows={30}
          onChangePage={(page, totalRows) => console.log(page, totalRows)}
          onChangeRowsPerPage={(currentRowsPerPage, currentPage) =>
            console.log(currentRowsPerPage, currentPage)
          }
          paginationPerPage={20}
          paginationRowsPerPageOptions={[20, 50, 100]}
        />
      </DialogContent>
    </ModalContainer>
  );
};

export default AgncSearchModal;
