import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";

const SubmitBtn = () => {
  const searchParams = useSearchParams();
  const ukey = searchParams.get("modifyUkey");
  const {
    formState: { isDirty, isValid, isSubmitting },
  } = useFormContext();
  return (
    <LoadingButton
      disabled={!isDirty || !isValid || isSubmitting}
      loading={isSubmitting}
      variant="contained"
      size="small"
      type="submit"
    >
      {ukey === null ? "등록" : "저장"}
    </LoadingButton>
  );
};

export default SubmitBtn;
