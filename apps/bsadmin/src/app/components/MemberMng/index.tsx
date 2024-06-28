import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import MyIcon from "icon/MyIcon";
import { DataTableBase, OutlinedButton } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useSetRecoilState } from "recoil";
import { memberManagementModalAtom } from "../../recoil/atoms/modalAtom";
import { useRecoilValue } from "recoil";
import dynamic from "next/dynamic";
import NoDataView from "../NoDataView";

interface MemberDataProps {
  selectMemberCallbak?: (memberData: Member[]) => void; // Updated: Corrected typo in the parameter name
  memberData: Member[];
  memberSearchModalFlag: boolean;
}

interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
}

const LazyMemberMngtModal = dynamic(() => import("./MemberMngModal"), {
  ssr: false,
});

const MemberDataTable: React.FC<MemberDataProps> = ({
  selectMemberCallbak,
  memberData,
  memberSearchModalFlag,
}) => {
  const setMemberManagementModalOpen = useSetRecoilState(
    memberManagementModalAtom,
  );

  //useRecoilState(memberManagementModalAtom);
  const getMemberManagementModalOpen = useRecoilValue(
    memberManagementModalAtom,
  );

  // [멤버 관리] 멤버 저장
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);

  useEffect(() => {
    setSelectedMembers(memberData ?? []);
  }, [memberData]);

  // [멤버 관리] 타 컴포넌트에서 멤버 정보 공유용

  const handleMemberSelection = (selectedMembers: Member[]) => {
    setSelectedMembers(selectedMembers);
    //console.log("selectedMembers", selectedMembers);
    selectMemberCallbak(selectedMembers);

    //onMemberSelection(selectedMembers);
  };

  const columns = React.useMemo(
    () => [
      {
        name: "아이디",
        selector: (row: { ebcEmail: string }) => row.ebcEmail,
      },
      {
        name: "이름",
        selector: (row: { custNm: string }) => row.custNm,
        width: "200px",
      },
    ],
    [],
  );

  const handleModalOpen = () => {
    setMemberManagementModalOpen(true);
  };

  // [멤버 관리] 모달 "닫기"
  const handleMemberCloseModal = (): void => {
    setMemberManagementModalOpen(false);
  };

  return (
    <>
      <DataTableBase
        title={
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">
              소속 연구원
              {selectedMembers && " (총 " + selectedMembers.length + "명)"}
            </Typography>

            {memberSearchModalFlag && (
              <OutlinedButton
                color="secondary"
                buttonName="소속 연구원 관리"
                size="small"
                sx={{ color: "black" }}
                endIcon={<MyIcon icon="cheveron-right" size={20} />}
                onClick={handleModalOpen}
              />
            )}
          </Stack>
        }
        data={selectedMembers}
        columns={columns}
        pointerOnHover
        highlightOnHover
        customStyles={dataTableCustomStyles}
        pagination={false}
        selectableRows={false}
        noDataComponent={<NoDataView />}
      />

      {/* 멤버 관리 모달 */}
      {getMemberManagementModalOpen && (
        <LazyMemberMngtModal
          onClose={handleMemberCloseModal}
          open={getMemberManagementModalOpen}
          modalWidth={1006}
          selectedMembers={selectedMembers}
          onMemberSelection={handleMemberSelection}
        />
      )}
    </>
  );
};

export default MemberDataTable;
