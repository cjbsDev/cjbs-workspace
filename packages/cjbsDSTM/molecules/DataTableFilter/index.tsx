import React from "react";
import { InputDefaultType, InputValidation } from "../../atoms/Inputs";
import { IconButton, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import MyIcon from "icon/MyIcon";
import { cjbsTheme } from "../../themes";

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

export const DataTableFilter2 = () => {
  return (
    <InputValidation
      inputName="Keyword"
      sx={{ width: 238 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {/*<MyIcon icon="search" size={20} />*/}
            <Typography variant="body2">검색</Typography>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              type="submit"
              sx={{
                backgroundColor: cjbsTheme.palette.primary.main,
                p: 0.65,
                mr: -1.75,
                borderRadius: "0px 4px 4px 0px !important",
              }}
            >
              <MyIcon icon="search" size={20} color="white" />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
