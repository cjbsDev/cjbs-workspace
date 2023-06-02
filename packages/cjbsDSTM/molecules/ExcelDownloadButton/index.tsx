'use client';
import React, { useState, useCallback } from 'react';
import { CircularProgress } from '../../../../node_modules/@mui/material/index';
import { POST_BLOB } from '../../../api/index';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { OutlinedButton } from '../../atoms/Buttons/index';

const ExcelDownloadButton = ({ downloadUrl, buttonName = 'Excel' }: { downloadUrl: string; buttonName?: string }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = useCallback(async (serverUrl: string) => {
    setIsDownloading(true);

    try {
      const response = await POST_BLOB(serverUrl); // API 요청
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
  }, []);

  return (
    <React.Fragment>
      <OutlinedButton
        sx={{
          border: '1px solid #CED4DA',
          color: 'black',
        }}
        onClick={() => handleDownload(downloadUrl)}
        buttonName={buttonName}
        startIcon={<ListAltIcon color='success' />}
      />{' '}
    </React.Fragment>
  );
};

export default ExcelDownloadButton;
