import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";
import { useSearchParams } from "next/navigation";

const SubmitBtn = () => {
  const searchParams = useSearchParams();
  const ukey = searchParams.get("modifyUkey");
  const {
    formState: { isDirty, isValid, isSubmitting, dirtyFields },
  } = useFormContext();

  console.log("!isValid || isSubmitting", isSubmitting || !isDirty);
  console.log("isDirty", isDirty);
  return (
    <LoadingButton
      disabled={!isValid || isSubmitting || !isDirty}
      // disabled={!isValid || Object.keys(dirtyFields).length === 0}
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
