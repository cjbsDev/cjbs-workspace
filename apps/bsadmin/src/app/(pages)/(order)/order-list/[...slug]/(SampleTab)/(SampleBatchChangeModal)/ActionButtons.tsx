import React from "react";
import { OutlinedButton } from "cjbsDSTM";
import { LoadingButton } from "@mui/lab";

interface ActionButtonsProps {
  handleClose: () => void;
  isLoading: boolean;
}
const ActionButtons = (props: ActionButtonsProps) => {
  const { handleClose, isLoading } = props;
  return (
    <>
      <OutlinedButton
        buttonName="닫기"
        onClick={handleClose}
        color="secondary"
      />
      <LoadingButton
        loading={isLoading}
        variant="contained"
        type="submit"
        form="sampleBatchChange"
      >
        저장
      </LoadingButton>
    </>
  );
};

export default ActionButtons;
