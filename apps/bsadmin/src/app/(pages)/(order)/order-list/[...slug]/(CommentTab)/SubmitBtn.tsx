import React from "react";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";

interface SubmitBtnProps {
  isLoading: boolean;
}
const SubmitBtn = (props: SubmitBtnProps) => {
  const { isLoading } = props;
  const { getValues, watch } = useFormContext();
  return (
    <LoadingButton
      loading={isLoading}
      loadingIndicator="등록중…"
      variant="contained"
      type="submit"
      sx={{ height: 135 }}
      fullWidth
      disabled={
        watch("memo") === undefined || watch("memo") === "" ? true : false
      }
    >
      등록
    </LoadingButton>
  );
};

export default SubmitBtn;
