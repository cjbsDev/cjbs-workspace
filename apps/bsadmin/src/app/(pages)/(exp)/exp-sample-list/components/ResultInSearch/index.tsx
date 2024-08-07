import React from "react";
import { OutlinedButton } from "cjbsDSTM";
import { Box, Popover } from "@mui/material";
import {
  bindTrigger,
  usePopupState,
  bindPopover,
} from "material-ui-popup-state/hooks";
// import { bindPopover } from "material-ui-popup-state";
import SearchForm from "./SearchForm";
import MyIcon from "icon/MyIcon";

const ResultInSearch = () => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "detailSearchPopover",
  });

  return (
    <Box>
      <OutlinedButton
        size="small"
        buttonName="상세검색"
        {...bindTrigger(popupState)}
        endIcon={
          popupState.isOpen ? (
            <MyIcon icon="cheveron-up" size={16} />
          ) : (
            <MyIcon icon="cheveron-down" size={16} />
          )
        }
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
        <SearchForm onClose={popupState.close} />
      </Popover>
    </Box>
  );
};

export default ResultInSearch;
