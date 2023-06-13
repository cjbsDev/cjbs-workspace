import React from 'react';
import { InputDefaultType } from '../../atoms/Inputs';
import { IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

interface FilterProps {
  filterText: string;
  onFilter: any;
  onClear: () => void;
}

export const DataTableMetaFilter = ({ filterText, onFilter, onClear }: FilterProps) => {
  return (
    <InputDefaultType
      sx={{ width: '341px' }}
      value={filterText}
      onChange={onFilter}
      placeholder='결과 내 재검색'
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={onClear}>
              <SearchRoundedIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
