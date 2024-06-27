import React, { useState } from "react";
import { cjbsTheme, InputValidation, OutlinedButton } from "cjbsDSTM";
import { Box, Chip, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import { useRecoilState, useRecoilValue } from "recoil";
import { mngEmailListAtom } from "../../../../../recoil/atoms/mngEmailListAtom";
const LazyMngSrchModal = dynamic(() => import("./MngSrchModal"), {
  ssr: false,
  // loading: () => <SkeletonLoading height={270} />,
});
const MngAddList = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [resEamilList, setResEmailList] = useRecoilState(mngEmailListAtom);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleMngDelete = (ukey) => {
    console.info("Delete ukey ==>.", ukey);
    const currentRcpnEmailList = resEamilList || []; // 현재 rcpnEmailList 가져오기
    const updatedRcpnEmailList = currentRcpnEmailList.filter(
      (item) => item.ukey !== ukey,
    ); // 삭제된 항목 제외
    setResEmailList(updatedRcpnEmailList);
  };

  return (
    <>
      <Box
        sx={{
          border: `1px solid ${cjbsTheme.palette.grey["400"]}`,
          borderRadius: 1,
          padding: "6px 16px",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <OutlinedButton
            buttonName="담당자 조회"
            size="small"
            onClick={handleModalOpen}
            sx={{ mr: 1.5 }}
          />
          {resEamilList.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: cjbsTheme.palette.grey["500"], pt: 0.3 }}
            >
              담당자 조회 버튼을 통해 선택 해 주세요.
            </Typography>
          ) : (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {resEamilList.map((item) => {
                const { ukey, nm, email } = item;
                return (
                  <Chip
                    key={ukey}
                    label={`${nm} ${email}`}
                    variant="outlined"
                    onDelete={() => handleMngDelete(ukey)}
                    size="small"
                    sx={{
                      borderRadius: 4,
                    }}
                  />
                );
              })}
            </Stack>
          )}
        </Stack>
      </Box>

      {isOpen && (
        <LazyMngSrchModal
          open={isOpen}
          onClose={handleModalClose}
          modalWidth={800}
        />
      )}
    </>
  );
};

export default MngAddList;
