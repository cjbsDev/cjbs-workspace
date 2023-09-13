import React, { useState } from "react";
import { InputValidation, OutlinedButton } from "cjbsDSTM";
import { Chip, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import SkeletonLoading from "../../../../../components/SkeletonLoading";
import { useFormContext } from "react-hook-form";
const LazyMngSrchModal = dynamic(() => import("./MngSrchModal"), {
  ssr: false,
  // loading: () => <SkeletonLoading height={270} />,
});
const MngInput = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { getValues } = useFormContext();

  console.log("ssssss", typeof getValues("rcpnEmailList"));
  const handleModalOpen = () => {
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };
  const handleMngDelete = (ukey) => {
    console.info("You clicked the delete icon.", ukey);
  };

  return (
    <>
      <Stack direction="row" spacing={1}>
        {/*<InputValidation*/}
        {/*  inputName="rcpnEmailList"*/}
        {/*  InputProps={{*/}
        {/*    readOnly: true,*/}
        {/*    hidden: true,*/}
        {/*  }}*/}
        {/*/>*/}
        {getValues("rcpnEmailList") === undefined ||
        getValues("rcpnEmailList") === "" ? (
          <Typography variant="body2">
            담당자 조회 버튼을 통해 선택 해 주세요.
          </Typography>
        ) : (
          <Stack direction="row" spacing={1}>
            {getValues("rcpnEmailList").map((item) => {
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
          // JSON.stringify(getValues("rcpnEmailList"))
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
