import React, { useEffect, useState } from 'react';
import {
  ModalAction,
  ModalContainer,
  ModalTitle,
} from '@components/molecules/CModal';
import { ErrorContainer, Fallback } from '@components/molecules/ErrorBoundary';
import { ContainedButton, OutlinedButton } from '@components/atoms/Buttons';
import {
  Backdrop,
  CircularProgress,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import useSWRMutation from 'swr/mutation';
import { Search } from '../../types';
import { fetcherPost } from 'api';
import ExcelDownloadButton from '@components/molecules/ExcelDownloadButton';
import { FileDownloadBtn } from '@components/molecules/FileDownloadBtn';

async function getSampleList(url: string, { arg }: { arg: Search }) {
  return await fetcherPost([url, arg]);
}

const Modal = ({ onClose, open, modalWidth, search }) => {
  const { trigger, isMutating, data } = useSWRMutation(
    '/sample/profiles',
    getSampleList,
  );
  const [isDsb, setIsDsb] = useState(false);

  useEffect(() => {
    trigger(search);
  }, []);

  console.log('Profiles Data ==>>', data);

  if (data === undefined) {
    return (
      <CircularProgress
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
        }}
      />
    );
  }

  return (
    <ModalContainer onClose={onClose} open={open} modalWidth={modalWidth}>
      <ModalTitle onClose={onClose}>분석 데이터 목록</ModalTitle>
      <DialogContent>
        <ErrorContainer FallbackComponent={Fallback}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Group</TableCell>
                  <TableCell align="center">Count</TableCell>
                  <TableCell align="center">Download</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.groups.map((item, index) => {
                  return (
                    <TableRow key={index.toString()}>
                      <TableCell align="center">{item.group}</TableCell>
                      <TableCell align="center">{item.count}</TableCell>
                      <TableCell align="center">
                        <FileDownloadBtn
                          buttonName="Dataset"
                          exportUrl={`/sample/metadata/download?ukey=${item.ukey}`}
                          iconName="xls3"
                          index={index}
                          onClose={onClose}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/*{JSON.stringify(data.data.groups)}*/}
        </ErrorContainer>
      </DialogContent>
      <ModalAction>
        <OutlinedButton
          buttonName="닫기"
          onClick={onClose}
          color="secondary"
          size="small"
        />
      </ModalAction>
    </ModalContainer>
  );
};

export default Modal;
