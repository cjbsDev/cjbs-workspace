"use client";
import React from "react";
import { OutlinedButton } from "cjbsDSTM";
// import {
//   bindPopover,
//   bindTrigger,
//   usePopupState,
// } from "material-ui-popup-state/es/hooks";
import { Box, Popover } from "@mui/material";
import { bindTrigger, usePopupState } from "material-ui-popup-state/hooks";
import { bindPopover } from "material-ui-popup-state";
import SearchForm from "./SearchForm";

const ResultInSearch = () => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "demoPopover",
  });
  return (
    <Box>
      <OutlinedButton
        size="small"
        buttonName="결과 내 검색"
        {...bindTrigger(popupState)}
      />
      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SearchForm />
      </Popover>
    </Box>
  );
};

export default ResultInSearch;
