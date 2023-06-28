import React, { useMemo } from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import MyIcon from "icon/myIcon";
import { DataTableBase, LeaderCip, XsmallButton } from "cjbsDSTM";
import { dataTableCustomStyles } from "cjbsDSTM/organisms/DataTable/style/dataTableCustomStyle";
import { useSetRecoilState } from "recoil";
import { memberManagementModalAtom } from "../../../../recoil/atoms/modalAtom";

interface MemberDataProps {
  selectedMembers: Member[];
}

interface Member {
  custUkey: any;
  ebcEmail: string;
  custNm: string;
  isAcs: string;
  isLeader: boolean;
}

const MemberDataTable: React.FC<MemberDataProps> = ({ selectedMembers }) => {
  const setMemberManagementModalOpen = useSetRecoilState(
    memberManagementModalAtom
  );

  //console.log("member datatable selectedMembers", selectedMembers);

  const columns = useMemo(
    () => [
      {
        name: "리더",
        cell: (row: { isLeader: any }) => (
          <>
            <Box>{row.isLeader == "Y" && <LeaderCip />} </Box>
          </>
        ),
        width: "150px",
      },
      {
        name: "아이디",
        selector: (row: { ebcEmail: string }) => row.ebcEmail,
      },
      {
        name: "이름",
        selector: (row: { custNm: string }) => row.custNm,
        width: "200px",
      },
      {
        name: "상태",
        cell: (row: { isAcs: string }) => (
          <>
            <Box>{row.isAcs == "Y" ? "사용" : "차단"} </Box>
          </>
        ),
        width: "150px",
      },
    ],
    []
  );

  const handleModalOpen = () => {
    setMemberManagementModalOpen(true);
  };

  return (
    <DataTableBase
      title={
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle1">
            멤버{selectedMembers && " (총 " + selectedMembers.length + "명)"}
          </Typography>
          <XsmallButton
            buttonName="멤버관리"
            color="secondary"
            endIcon={<MyIcon icon="cheveron-right" size={20} />}
            onClick={handleModalOpen}
          />
        </Stack>
      }
      data={selectedMembers}
      columns={columns}
      pointerOnHover
      highlightOnHover
      customStyles={dataTableCustomStyles}
      pagination={false}
      selectableRows={false}
    />
  );
};

export default MemberDataTable;
