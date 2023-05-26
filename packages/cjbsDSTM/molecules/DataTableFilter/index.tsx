import React from 'react';
import {InputDefaultType} from "../../atoms/Inputs";
import {IconButton} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

interface FilterProps {
  filterText: string;
  onFilter: any;
  onClear: () => void;
}

export const DataTableFilter = ({ filterText, onFilter, onClear }: FilterProps) => {

  return (
    <InputDefaultType
      value={filterText}
      onChange={onFilter}
      InputProps={{
      startAdornment: <InputAdornment position="start">
        <SearchRoundedIcon />검색
      </InputAdornment>,
      endAdornment: <InputAdornment position="end">
        <IconButton onClick={onClear}>
          <ClearRoundedIcon />
        </IconButton>
      </InputAdornment>
    }}
    />
  );
};
