import React, { useCallback, useMemo, useState } from "react";
import { ContainedButton, DataTableBase, Title1 } from "cjbsDSTM";
import { dataTableCustomStyles2 } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import useSWR from "swr";
import { fetcher } from "api";
import { useParams, usePathname } from "next/navigation";
import { Box } from "@mui/material";
import { getColumns } from "./Columns";
import SubHeader from "./SubHeader";
import MCItemAddModifyModal from "./MCItemAddModifyModal";
import { router } from "next/client";
import { useRouter } from "next-nprogress-bar";
import MyIcon from "icon/MyIcon";
import useCalculatedHeight from "../../../../hooks/useCalculatedHeight";
import { useRecoilValue } from "recoil";
import { filterTextAtom } from "./atom";

const McDetailDataTable = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const params = useParams();
  const { slug } = params;
  const height = useCalculatedHeight(830);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(50);
  const [selectItem, setSelectItem] = useState({});
  const [mcCodeModifyModal, setMcCodeModifyModal] = useState<boolean>(false);
  const filterText = useRecoilValue(filterTextAtom);

  const { data } = useSWR(`/mngr/masterCode/detail/${slug}`, fetcher, {
    suspense: true,
  });

  const { masterCodeDetailList, pageInfo } = data;
  const { totalElements } = pageInfo;

  console.log("masterCodeDetailList", masterCodeDetailList);

  const columns = useMemo(() => getColumns(), []);

  const handleAddRow = () => {
    // const tempObj = {
    //   detailUniqueCode: "",
    //   douzoneCode: "",
    //   codeNm: "",
    //   codeValue: "",
    //   isExpsOrsh: "",
    //   isRls: "",
    // };
    // setSelectItem(tempObj);
    // console.log("sdfsdfsjdflkjlk");
    router.push(currentPath + "?type=add");
    setMcCodeModifyModal(true);
  };

  const filteredItems = masterCodeDetailList.filter(
    (item) =>
      (item.douzoneCode &&
        item.douzoneCode.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.codeNm &&
        item.codeNm.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.codeValue &&
        item.codeValue.toLowerCase().includes(filterText.toLowerCase())),
  );

  const subHeaderComponentMemo = useMemo(
    () => (
      <SubHeader
        totalElements={filteredItems.length}
        handleAddRow={handleAddRow}
      />
    ),
    [filteredItems.length, handleAddRow],
  );

  const handlePageChange = useCallback((page: React.SetStateAction<number>) => {
    setPage(page);
  }, []);

  const handlePerRowsChange = useCallback(
    (newPerPage: React.SetStateAction<number>, page: any) => {
      setSize(newPerPage);
    },
    [],
  );

  // [ 마스터 코드 ] 모달 오픈
  // const mcItemModifyModalOpen = (item: DataItem) => {
  //   console.log("SSSSSSSSS", item);
  //
  //   setSelectItem(item);
  //   setMcCodeModifyModal(true);
  // };

  // [ 마스터 코드 ] 모달 닫기
  const mcItemModifyModalClose = () => {
    setMcCodeModifyModal(false);
    setSelectItem({});
    router.push(currentPath);
  };

  const handleOnRowClicked = useCallback((row) => {
    console.log("Clicked Data", row);
    setSelectItem(row);
    setMcCodeModifyModal(true);
  }, []);

  return (
    <>
      <Box sx={{ display: "grid" }}>
        {/*<ContainedButton*/}
        {/*  buttonName="코드 추가"*/}
        {/*  size="small"*/}
        {/*  startIcon={<MyIcon icon="plus" size={16} />}*/}
        {/*  onClick={handleAddRow}*/}
        {/*/>*/}
        <DataTableBase
          title={<Title1 titleName="마스터 코드" />}
          data={filteredItems}
          columns={columns}
          onRowClicked={handleOnRowClicked}
          highlightOnHover
          customStyles={dataTableCustomStyles2}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          fixedHeader={true}
          fixedHeaderScrollHeight={`${height}px`}
          selectableRows={false}
          paginationServer={false}
          // paginationTotalRows={totalElements}
          // onChangeRowsPerPage={handlePerRowsChange}
          // onChangePage={handlePageChange}
          // paginationPerPage={50}
          paginationRowsPerPageOptions={[15, 20, 50, 100]}
        />
      </Box>
      {/* 코드 수정 모달  */}
      {/*<MCItemAddModifyModal*/}
      {/*  onClose={mcItemModifyModalClose}*/}
      {/*  open={mcCodeModifyModal}*/}
      {/*  modalWidth={800}*/}
      {/*  // selectItem={selectItem}*/}
      {/*  // uniqueCode={slug}*/}
      {/*  // renderList={renderList}*/}
      {/*/>*/}
      {mcCodeModifyModal && (
        <MCItemAddModifyModal
          onClose={mcItemModifyModalClose}
          open={mcCodeModifyModal}
          modalWidth={800}
          selectItem={selectItem}
        />
      )}
    </>
  );
};

export default McDetailDataTable;
