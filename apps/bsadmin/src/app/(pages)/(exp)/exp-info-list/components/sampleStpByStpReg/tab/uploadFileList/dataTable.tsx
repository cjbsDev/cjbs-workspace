import React, { useMemo } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../../../components/NoDataView";
import { DataTableBase } from "cjbsDSTM";
import { Columns } from "./columns";

const DataTable = ({
  listData,
  totalElements,
  handlePageChange,
  handlePerRowsChange,
}) => {
  const columns = useMemo(() => Columns(), []);

  return (
    <DataTableBase
      data={listData}
      columns={columns}
      // onRowClicked={goDetailPage}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      // subHeader
      // subHeaderComponent={subHeaderComponentMemo}
      selectableRows={false}
      pagination
      paginationServer
      paginationTotalRows={totalElements}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      noDataComponent={<NoDataView />}
    />
  );
};

export default DataTable;
