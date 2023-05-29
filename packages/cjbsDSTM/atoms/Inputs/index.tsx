import * as React from 'react';
import {TextField, TextFieldProps, IconButton} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const InputDefaultType = ({...props}: TextFieldProps) => {
  return   <TextField {...props} size="small" />
};

// export const InputFilterType = ({...props}: TextFieldProps) => {
//   return   <TextField {...props} size="small" InputProps={{
//     startAdornment: <InputAdornment position="start">검색</InputAdornment>,
//     endAdornment: <InputAdornment position="end">
//       <IconButton>
//         <SearchRoundedIcon />
//       </IconButton>
//     </InputAdornment>
//   }} />
// };
