import React, { useMemo, useState } from "react";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { DataTableBase, DataTableFilter, OutlinedButton } from "cjbsDSTM";
import useSWR from "swr";
import { fetcher } from "api";
import { Box, Grid, Stack } from "@mui/material";
import { toast } from "react-toastify";
import MyIcon from "icon/MyIcon";

interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
  agncNm?: string;
  instNm?: string;
}

const initialData: Member[] = [];

interface MemberMngDataTableProps {
  selectedMembers: {};
}

const MemberMngDataTable = ({ selectedMembers }: MemberMngDataTableProps) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  // [고객] row 세팅
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [key, setKey] = useState<number>(0); // 특정 조건에서 checkbox 해제 할 때 필요
  const [memeberData, setMemberData] = useState<Member[]>(
    selectedMembers ?? initialData,
  );
  const [selectedMemberRows, setSelectedMemberRows] = useState<number[]>([]);

  const { data } = useSWR(`/cust/list`, fetcher, {
    suspense: true,
  });
  const { custList } = data;
  console.log("소속연구원 검색 리스트", custList);

  const filteredItems = custList.filter(
    (item) =>
      (item.custNm &&
        item.custNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.agncNm &&
        item.agncNm.toLowerCase().includes(filterText.toLowerCase())),
  );

  const columns = useMemo(
    () => [
      {
        name: "고객",
        cell: (row: Member) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.custNm}</Box>
              <Box>{row.ebcEmail}</Box>
            </Stack>
          </>
        ),
        minWidth: "150px",
      },
      {
        name: "거래처(PI)",
        cell: (row: Member) => (
          <>
            <Stack
              direction="row"
              spacing={0.4}
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
            >
              <Box>{row.agncNm}</Box>
              {row.instNm && <Box>({row.instNm})</Box>}
            </Stack>
          </>
        ),
        minWidth: "150px",
      },
    ],
    [],
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    // [멤버 관리] - row 추가
    const handleAddRow = () => {
      // 여기서 왼쪽 데이터를 받아서 넣어야 될듯.
      //console.log("handleAddRow-selectedRows", selectedRows);

      const newMemberDataList: Member[] = [];
      selectedRows.selectedRows.forEach((row: any) => {
        // 기존 멤버 확인 후 있다면 추가를 무시함
        const existingMember = memeberData.find(
          (member) => member.custUkey === row.custUkey,
        );
        if (existingMember) {
          return;
        }

        if (row.instNm) {
          toast("이미 거래처가 있는 고객은 연구원으로 등록 할 수 없습니다.");
          return;
        }

        let newRow: Member = {
          custUkey: row.custUkey,
          ebcEmail: row.ebcEmail,
          custNm: row.custNm,
        };

        newMemberDataList.push(newRow);
        clearSelectedRows(); // 추가 후에 datatable 에 선택된 checkbox 해제
      });

      setMemberData((prevData) => [...prevData, ...newMemberDataList]);
    };

    return (
      <Grid container>
        <Grid item xs={7} sx={{ display: "flex" }}>
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
        <Grid item xs={5} sx={{ pt: 0, textAlign: "right" }}>
          <OutlinedButton
            buttonName="추가"
            size="small"
            color="secondary"
            endIcon={<MyIcon icon="plus" size={16} />}
            onClick={handleAddRow}
          />
          {/*<Stack direction="row" spacing={2} alignItems="center">*/}
          {/*  <DataCountResultInfo*/}
          {/*    totalCount={data.pageInfo.totalElements}*/}
          {/*  />*/}
          {/*</Stack>*/}
        </Grid>
      </Grid>
    );
  }, [filterText, resetPaginationToggle, selectedRows, memeberData]);

  const handleRowSelected = (rows: any) => {
    setSelectedRows(rows);
  };

  const clearSelectedRows = () => {
    setSelectedRows([]);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <DataTableBase
        data={filteredItems}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        onSelectedRowsChange={handleRowSelected}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        paginationResetDefaultPage={resetPaginationToggle}
        selectableRows={true}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        keyField="uniqueKey"
        key={key}
        // paginationServer
        // paginationTotalRows={totalElements}
        // onChangeRowsPerPage={handlePerRowsChange}
        // onChangePage={handlePageChange}
      />
    </>
  );
};

export default MemberMngDataTable;
