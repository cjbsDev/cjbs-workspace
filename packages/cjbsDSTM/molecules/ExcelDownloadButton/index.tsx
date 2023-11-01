'use client';
import React, { useState, useCallback } from 'react';
import { POST_BLOB } from '../../../api/index';
import { OutlinedButton, UnStyledButton } from '../../atoms/Buttons/index';
import MyIcon from 'icon/MyIcon';
import { SxProps } from '@mui/material';

const ExcelDownloadButton = ({
  downloadUrl,
  data,
  buttonName = 'Excel',
  sx,
  size,
}: {
  downloadUrl: string;
  data?: any;
  buttonName?: string;
  sx?: SxProps;
  size:string;
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async () => {
    setIsDownloading(true);

    try {
      const response = await POST_BLOB(downloadUrl, data); // API 요청
      const name = response.headers['content-disposition'].split('filename=')[1].replace(/"/g, '');

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;

      link.setAttribute('download', name);

      link.style.cssText = 'display:none';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error occurred while downloading data:', error);
    }

    setIsDownloading(false);
  }, [data]);

  return (
    <UnStyledButton
      onClick={handleDownload}
      sx={sx}
      buttonName={buttonName}
      startIcon={<MyIcon icon='xls3' size={18} />}
      size={size === undefined ? '' : size}
    />
  );
};

export default ExcelDownloadButton;
