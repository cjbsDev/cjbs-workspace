import React from "react";
import { InputDefaultType, InputValidation } from "../../atoms/Inputs";
import { IconButton, Stack, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "../../themes";
import { ContainedButton } from "../../atoms/Buttons";

interface FilterProps {
  filterText: string;
  onFilter: any;
  onClear: () => void;
}

export const DataTableFilter = ({
  filterText,
  onFilter,
  onClear,
}: FilterProps) => {
  return (
    <InputDefaultType
      sx={{ width: 238 }}
      placeholder="검색"
      value={filterText}
      onChange={onFilter}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MyIcon icon="search" size={20} />
            {/*<Typography variant="body2">검색</Typography>*/}
          </InputAdornment>
        ),
        endAdornment: filterText !== "" && (
          <InputAdornment position="end">
            <IconButton onClick={onClear}>
              <MyIcon icon="x" size={20} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
