import React from 'react';
import {ButtonProps} from '@mui/material';
import {OutlinedButton} from "../../atoms/Buttons";
import ListAltIcon from '@mui/icons-material/ListAlt';

interface ExcelDownloadButtonProps extends ButtonProps{
  labelName: string
}

export const ExcelDownloadButton = ({...props}: ExcelDownloadButtonProps) => {
  const {labelName} = props
  return (
    <OutlinedButton
      {...props}
      sx={{
        border: '1px solid #CED4DA',
        color: 'black'
      }}
      buttonName={labelName}
      startIcon={<ListAltIcon color='success' />}
    />
  );
};
