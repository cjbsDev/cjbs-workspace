import React from 'react';
import {OutlinedButton} from "../../atoms/Buttons";
import ListAltIcon from '@mui/icons-material/ListAlt';

export const ExcelDownloadButton = ({...props}) => {
  const {buttonName} = props
  return (
    <OutlinedButton
      {...props}
      sx={{
        border: '1px solid #CED4DA',
        color: 'black'
      }}
      buttonName={buttonName}
      startIcon={<ListAltIcon color='success' />}
    />
  );
};
