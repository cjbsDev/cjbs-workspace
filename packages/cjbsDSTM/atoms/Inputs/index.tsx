import * as React from 'react';
import {TextField, TextFieldProps, IconButton} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const InputDefaultType = ({...props}: TextFieldProps) => {
  return   <TextField {...props} size="small" />
};
