import React, { useState, useMemo } from "react";
import {
  DataCountResultInfo,
  DataTableBase,
  DataTableFilter,
  ExcelDownloadButton,
  ModalContainer,
  ModalTitle,
  OutlinedButton,
} from "cjbsDSTM";
import { Chip, DialogContent, Grid, Stack, Typography } from "@mui/material";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import axios from "axios";
import { useFormContext } from "react-hook-form";

interface ModalContainerProps {
  // children?: React.ReactNode;
  onClose: () => void;
  open: boolean;
  modalWidth: number;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ProjectSearchModal = ({
  onClose,
  open,
  modalWidth,
}: ModalContainerProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const [perPage, setPerPage] = useState(50);
  const [pageIndex, setPageIndex] = useState(0);
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/mngr/prjc/list/unRgst?page.page=${pageIndex}&page.size=${perPage}`,
    fetcher,
    {
      suspense: true,
    }
  );
  const { setValue, clearErrors } = useFormContext();

  //console.log("Modal data", data.data);

  // useMemo will only be created once

  const columns = useMemo(
    () => [
      {
        name: "코드",
        selector: (row: { prjcUniqueCodeMc: string }) => row.prjcUniqueCodeMc,
        width: "200px",
      },
      {
        name: "과제명",
        selector: (row: { prjcNm: string }) => row.prjcNm,
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
                setValue("prjcUniqueCode", row.prjcUniqueCodeMc);
                setValue("prjcNm", row.prjcNm);
                onClose();
                clearErrors("prjcNm");
              }}
            />
          );
        },
        width: "100px",
      },
    ],
    []
  );

  const filteredData = data.data.instList;

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
            <DataCountResultInfo
              totalCount={data.data.pageInfo.totalElements}
            />
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
  }, [filterText, resetPaginationToggle]);

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

export default ProjectSearchModal;
