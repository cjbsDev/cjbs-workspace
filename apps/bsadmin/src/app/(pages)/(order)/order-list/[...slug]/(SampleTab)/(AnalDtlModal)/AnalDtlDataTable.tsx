import React, { useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { DataTableBase } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams } from "next/navigation";
import { columns } from "./analDtlColumns";
import { RecoilRoot, useRecoilValue } from "recoil";
import { analDtlAtom } from "./analDtlAtom";
import SubHeader from "./Subheader";
import NoDataView from "../../../../../../components/NoDataView";

const AnalDtlDataTable = (props: { sampleUkeyList: string[] }) => {
  const { sampleUkeyList } = props;
  console.log("SampleUkeyList @@@@@@@@>>", sampleUkeyList);

  const getIsAnlsItst = useRecoilValue(analDtlAtom);
  const params = useParams();
  const uKey = params.slug;
  const apiUrl = `/anls/itst/${uKey}/sample/list?sampleUkeyList=${sampleUkeyList}&isAnlsItstCreated=${getIsAnlsItst}`;
  const { data } = useSWR(() => apiUrl, fetcher, {
    suspense: true,
  });

  console.log("분석 내역 DATA ==>>", data);

  const analDtlColumns = useMemo(() => columns, []);

  const subHeaderComponentMemo = React.useMemo(() => {
    return (
      <SubHeader sampleUkeyList={sampleUkeyList} dataLength={data.length} />
    );
  }, [data.length]);

  const rowDisabled = (row: { isAnlsItst: string }) => row.isAnlsItst === "Y";

  return (
    <RecoilRoot override={false}>
      <DataTableBase
        data={data}
        columns={analDtlColumns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[5, 10, 15]}
        selectableRows
        selectableRowDisabled={rowDisabled}
        noDataComponent={<NoDataView />}
      />
    </RecoilRoot>
  );
};

export default AnalDtlDataTable;
