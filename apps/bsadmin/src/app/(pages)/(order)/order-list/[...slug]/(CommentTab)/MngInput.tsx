import React, { useState } from "react";
import { InputValidation, OutlinedButton } from "cjbsDSTM";
import { Chip, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import { useFormContext } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import { mngEmailListAtom } from "../../../../../recoil/atoms/mngEmailListAtom";
const LazyMngSrchModal = dynamic(() => import("./MngSrchModal"), {
  ssr: false,
  // loading: () => <SkeletonLoading height={270} />,
});
const MngInput = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getValues } = useFormContext();
  // const [emailList, setEmailList] = useState(getValues("rcpnEmailList"));
  // const getResEmailList = useRecoilValue(mngEmailListAtom);
  const [resEamilList, setResEmailList] = useRecoilState(mngEmailListAtom);

  console.log("ssssss", resEamilList);
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleMngDelete = (ukey) => {
    console.info("You clicked the delete icon.", ukey);
    const currentRcpnEmailList = resEamilList || []; // 현재 rcpnEmailList 가져오기
    const updatedRcpnEmailList = currentRcpnEmailList.filter(
      (item) => item.ukey !== ukey
    ); // 삭제된 항목 제외
    setResEmailList(updatedRcpnEmailList);
    // setValue("rcpnEmailList", updatedRcpnEmailList); // 업데이트된 리스트로 다시 설정
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        {resEamilList.length === 0 ? (
          <Typography variant="body2">
            담당자 조회 버튼을 통해 선택 해 주세요.
          </Typography>
        ) : (
          <Stack direction="row" spacing={1}>
            {resEamilList.map((item: any) => {
              return (
                <Chip
                  key={item.ukey}
                  label={`${item.nm} ${item.email}`}
                  variant="outlined"
                  onDelete={() => handleMngDelete(item.ukey)}
                />
              );
            })}
          </Stack>
        )}

        <OutlinedButton
          buttonName="담당자 조회"
          size="small"
          onClick={handleModalOpen}
        />
      </Stack>

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

export default MngInput;
