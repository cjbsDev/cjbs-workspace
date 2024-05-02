import React, { useMemo } from "react";
import useSWR from "swr";
import { fetcher } from "api";
import { useFormContext } from "react-hook-form";
import { dataTableCustomStyles3 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import NoDataView from "../../../../../../components/NoDataView";
import { DataTableBase, OutlinedButton } from "cjbsDSTM";
import SubHeader from "./SubHeader";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  sampleAddAtom,
  sampleAddDataAtom,
  toggleClearedAtom,
} from "./sampleAddAtom";
import { getColumns } from "./Columns";

const ReinaDataTable = ({ openPopup }) => {
  const { getValues, setValue, watch } = useFormContext();
  const setSmpAdd = useSetRecoilState(sampleAddAtom);
  const [sampleData, setSampleData] = useRecoilState(sampleAddDataAtom);
  const [toggleCleared, setToggleCleared] = useRecoilState(toggleClearedAtom);
  const sampleUkeyList = watch("sampleUkeyList");
  // setSampleData(sampleUkeyList.toString());

  console.log("@@@@@", sampleUkeyList);
  console.log("#####", sampleData);
  // setSmpAdd(sampleUkeyList.toString());
  const { data } = useSWR(
    sampleData !== undefined
      ? `/ots/sample/detail?sampleUkeyList=${sampleData}`
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

  const columns = useMemo(() => getColumns(), []);

  const subHeaderComponentMemo = useMemo(
    () => <SubHeader totalElements={sampleList.length} openPopup={openPopup} />,
    [sampleList, openPopup],
  );

  const handleSelectedRowChange = ({ selectedRows }) => {
    console.log("EERERERERERE", selectedRows);
    const filteredSampleUkeyList = selectedRows.map((item) => item.sampleUkey);
    console.log("filteredSampleUkeyList@@@@ ==>>", filteredSampleUkeyList);
    setSmpAdd(filteredSampleUkeyList);
  };

  return (
    <>
      <DataTableBase
        data={sampleList}
        columns={columns}
        customStyles={dataTableCustomStyles3}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        selectableRows
        onSelectedRowsChange={handleSelectedRowChange}
        clearSelectedRows={toggleCleared}
        pagination={false}
        noDataComponent={<NoDataView />}
      />
    </>
  );
};

export default ReinaDataTable;
