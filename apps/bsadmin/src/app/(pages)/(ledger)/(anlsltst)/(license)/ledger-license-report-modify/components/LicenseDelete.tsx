import React, { useState } from "react";
import {useFormContext, useWatch} from "react-hook-form";
import {IconButton, Stack } from "@mui/material";
import MyIcon from "icon/MyIcon";

const LicenseDelete = (props:any) => {

  const { index, remove } = props;
  const { setValue, getValues, control } = useFormContext();
  const sampleValue = useWatch({
    name: "sample",
    control,
  });

  const addTypeVal = sampleValue[index].addType;

  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} sx={{ width : '100%' }}>
      {addTypeVal === "button" && (
        <IconButton aria-label="delete" onClick={() => remove(index)}>
          <MyIcon icon="trash" size={20} />
        </IconButton>
      )}
    </Stack>
  );
};

export default LicenseDelete;
