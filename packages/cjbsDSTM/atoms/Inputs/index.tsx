import * as React from 'react';
import {TextField, TextFieldProps, IconButton} from '@mui/material';
import {FormContainer, TextFieldElement} from 'react-hook-form-mui';
import {useWatch} from 'react-hook-form-mui';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const InputDefaultType = ({...props}: TextFieldProps) => {
  return <TextField {...props} size="small" />
};

export const RHFInputDefaultType = () => {
  return (
      <TextFieldElement name='testName' size='small' />
  )
}

// export const InputValue = ({fieldName}) => {
//   const value = useWatch(fieldName)
//   return value
// }
