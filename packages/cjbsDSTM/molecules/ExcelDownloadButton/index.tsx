'use client';
import React, { useState, useCallback } from 'react';
import { CircularProgress } from '../../../../node_modules/@mui/material/index';
import { POST_BLOB } from '../../../api/index';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { OutlinedButton, UnStyledButton } from '../../atoms/Buttons/index';
import MyIcon from '../../../icon/MyIcon';
import { SxProps } from '@mui/material';

const ExcelDownloadButton = ({
  downloadUrl,
  data,
  buttonName = 'Excel',
  sx,
}: {
  downloadUrl: string;
  data?: any;
  buttonName?: string;
  sx?: SxProps;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async (serverUrl: string) => {
    setIsDownloading(true);

    try {
      const response = await POST_BLOB(serverUrl, data); // API 요청
      console.log('response> ', response);
    } catch (error) {
      console.error('Error occurred while downloading data:', error);
    }

    setIsDownloading(false);
  }, []);

  return <UnStyledButton sx={sx} buttonName={buttonName} startIcon={<MyIcon icon='xls3' size={18} />} />;
};

export default ExcelDownloadButton;
