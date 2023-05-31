'use client';
import React, { useState } from 'react';
import { CircularProgress } from '../../../../node_modules/@mui/material/index';
import Image from '../../../../node_modules/next/image';
import { GET_BLOB } from '../../../api/index';

const ExcelDownload = ({ downloadUrl }: { downloadUrl: string }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (serverUrl: string) => {
    setIsDownloading(true);

    try {
      const response = await GET_BLOB(serverUrl); // API 요청
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
  };

  return (
    <React.Fragment>
      {isDownloading ? (
        <CircularProgress size={'sm'} style={{ margin: '0px 20px' }} />
      ) : (
        <button
          style={{
            margin: '0px 20px',
            border: '0px',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          }}
          onClick={() => handleDownload(downloadUrl)}
        >
          <Image src={'/statics/img/icon/xls.png'} width={25} height={25} quality={100} alt='Picture of the author' />
        </button>
      )}
    </React.Fragment>
  );
};

export default ExcelDownload;
