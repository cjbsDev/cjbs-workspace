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
import NoDataView from "../../../components/NoDataView";

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const ProjectSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const { data } = useSWR(
    `/mngr/prjt/list/unRgst?page=${page}&size=${size}`,
    fetcher,
    {
      suspense: true,
    },
  );
  const { setValue, clearErrors } = useFormContext();
  // useMemo will only be created once
  const { instList, pageInfo } = data;
  // console.log("PPPPPPPPP", data);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const columns = useMemo(
    () => [
      {
        name: "코드",
        selector: (row: { prjtUniqueCodeMc: string }) => row.prjtUniqueCodeMc,
        width: "200px",
      },
      {
        name: "과제명",
        selector: (row: { prjtNm: string }) => row.prjtNm,
        width: "450px",
      },

      {
        name: "선택",
        cell: (row: any) => {
          return (
            <OutlinedButton
              size="small"
              buttonName="선택"
              onClick={() => {
                setValue("prjtUniqueCode", row.prjtUniqueCodeMc);
                setValue("prjtNm", row.prjtNm);
                // onClose();
                handleClose();
                clearErrors("prjtNm");
              }}
            />
          );
        },
        width: "100px",
      },
    ],
    [setValue, clearErrors, handleClose],
  );

  // const filteredData = data.instList;

  const filteredData = instList.filter(
    (item) =>
      (item.prjtUniqueCodeMc &&
        item.prjtUniqueCodeMc
          .toLowerCase()
          .includes(filterText.toLowerCase())) ||
      (item.prjtNm &&
        item.prjtNm.toLowerCase().includes(filterText.toLowerCase())),
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
            <DataCountResultInfo totalCount={pageInfo.totalElements} />
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
  }, [filterText, resetPaginationToggle, pageInfo.totalElements]);

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>과제 검색</ModalTitle>
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
      </DialogContent>
    </ModalContainer>
  );
};

export default ProjectSearchModal;
