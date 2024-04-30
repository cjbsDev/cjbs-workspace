import React, { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../../components/NoDataView";
import { DataTableBase, OutlinedButton } from "cjbsDSTM";
import SubHeader from "./SubHeader";
import { useRecoilState, useSetRecoilState } from "recoil";
import { sampleAddAtom } from "./sampleAddAtom";

const ReinaDataTable = ({ openPopup }) => {
  const { getValues, setValue, watch } = useFormContext();
  const setSmpAdd = useSetRecoilState(sampleAddAtom);
  const sampleUkeyList = watch("sampleUkeyList");
  console.log("TYTYTYTYTY", sampleUkeyList);
  setSmpAdd(sampleUkeyList.toString());
  const { data } = useSWR(
    sampleUkeyList !== undefined
      ? `/ots/sample/detail?sampleUkeyList=${sampleUkeyList.toString()}`
      : null,
    fetcher,
    {
      suspense: true,
    },
  );

  console.log("1111111", data);
  const { sampleList, orderInfo, sampleInfo } = data;
  setValue("orderInfo", orderInfo);
  setValue("sampleInfo", sampleInfo);

  const columns = useMemo(
    () => [
      {
        name: "샘플 번호",
        center: true,
        allowOverflow: true,
        // width: "80px",
        // sortable: true,
        selector: (row) => row.sampleId,
      },
      {
        name: "샘플명",
        center: true,
        allowOverflow: true,
        selector: (row) => row.sampleNm,
      },
      {
        name: "샘플종류",
        center: true,
        allowOverflow: true,
        // width: "80px",
        // sortable: true,
        selector: (row) => row.sampleTypeVal,
      },
      {
        name: "Source",
        allowOverflow: true,
        center: true,
        selector: (row) => row.source,
      },
      {
        name: "Depth(GB)",
        center: true,
        selector: (row) => row.depthVal,
      },
      {
        name: "Taxon",
        center: true,
        allowOverflow: true,
        selector: (row) => row.taxonVal,
      },
      {
        name: "오더 번호",
        center: true,
        selector: (row) => row.orderId,
      },
      {
        name: "서비스 타입",
        center: true,
        selector: (row) => row.srvcTypeVal,
      },
    ],
    [],
  );

  const handleSelectedRowChange = ({ selectedRows }) => {
    console.log("EERERERERERE", selectedRows);
    const filteredSampleUkeyList = selectedRows.map((item) => item.sampleUkey);
    console.log("filteredSampleUkeyList ==>>", filteredSampleUkeyList);
    // setSmpAdd(filteredSampleUkeyList);
    // setValue("sampleUkeyList", filteredSampleUkeyList);
  };

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={sampleList.length} openPopup={openPopup} />,
    [sampleList, openPopup],
  );

  return (
    <>
      <DataTableBase
        data={sampleList}
        columns={columns}
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        // selectableRowSelected={rowSelectCritera}
        // selectableRowDisabled={rowSelectCritera}
        onSelectedRowsChange={handleSelectedRowChange}
        // clearSelectedRows={toggledClearRows}
        pagination={false}
        noDataComponent={<NoDataView />}
      />
    </>
  );
};

export default ReinaDataTable;
