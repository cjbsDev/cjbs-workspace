import {TextField, TextFieldProps} from '@mui/material';

export const InputDefaultType = ({...props}: TextFieldProps) => {
  return   <TextField {...props} size="small" />
};
