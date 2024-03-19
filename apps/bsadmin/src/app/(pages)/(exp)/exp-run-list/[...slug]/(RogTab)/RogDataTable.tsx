import React, { useMemo } from "react";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { DataTableBase } from "cjbsDSTM";
import { Box, IconButton, Stack } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "api";
import { Columns } from "./Columns";
import { useSetRecoilState } from "recoil";
import { runUpdateHstrUkeyAtom } from "./rogAtom";

const RogDataTable = ({ handleOpen }) => {
  const params = useParams();
  const uKey = params.slug;
  const { data } = useSWR(`/run/log/${uKey}`, fetcher, {
    suspense: true,
  });
  const setRunUpdateHstrUkey = useSetRecoilState(runUpdateHstrUkeyAtom);

  console.log("Rog Data", data);

  const rogDataList = data.updateLogList;
  const handleRowClick = (row) => {
    const { runUpdateHstrUkey } = row;
    console.log("TTTTTTTT", runUpdateHstrUkey);
    setRunUpdateHstrUkey(runUpdateHstrUkey);
    handleOpen();
  };

  const columns = Columns();

  return (
    <Box sx={{ display: "grid" }}>
      <DataTableBase
        data={rogDataList}
        columns={columns}
        onRowClicked={handleRowClick}
        // pointerOnHover
        // highlightOnHover
        customStyles={dataTableCustomStyles3}
        selectableRows={false}
        // subHeader
        // subHeaderComponent={subHeaderComponentMemo}
        // selectableRows
        // onSelectedRowsChange={handleSelectedRowChange}
        // clearSelectedRows={isClear}
        // selectableRowsVisibleOnly={true}
        // pagination
        // paginationServer
        // paginationTotalRows={totalElements}
        // onChangeRowsPerPage={handlePerRowsChange}
        // onChangePage={handlePageChange}
      />
    </Box>
  );
};

export default RogDataTable;
