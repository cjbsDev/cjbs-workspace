import React from "react";
import { LoadingButton } from "@mui/lab";
import { useFormContext } from "react-hook-form";

const Submit = () => {
  const {
    formState: { isDirty, isValid, isSubmitting, dirtyFields },
  } = useFormContext();
  return (
    <>
      <LoadingButton
        disabled={!isValid || isSubmitting || !isDirty}
        loading={isSubmitting}
        variant="contained"
        type="submit"
        form="runAddForm"
        size="small"
      >
        등록
      </LoadingButton>
    </>
  );
};

export default Submit;
