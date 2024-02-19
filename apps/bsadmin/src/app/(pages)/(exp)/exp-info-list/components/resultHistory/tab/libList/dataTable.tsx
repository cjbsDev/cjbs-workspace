import React, { useMemo } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../../../components/NoDataView";
import { DataTableBase } from "cjbsDSTM";
import { Columns } from "./columns";

const DataTable = ({ data }) => {
  const columns = useMemo(() => Columns(), []);

  return (
    <>
      <DataTableBase
        data={data}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        selectableRows={false}
        pagination
        noDataComponent={<NoDataView />}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 15, 20]}
      />
    </>
  );
};

export default DataTable;
