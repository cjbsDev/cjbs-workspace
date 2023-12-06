import { Box, Stack, Typography } from '@mui/material';
import MyIcon from 'icon/MyIcon';
import { cjbsTheme, OutlinedButton } from 'cjbsDSTM';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import React from 'react';
import NoResultImage from '../../../../public/img/search/no-result.png';
import SearchImage from '../../../../public/img/search/search.png';
import Image from 'next/image';
import Title from '../../atoms/Title';

interface NoDataViewProps {
  resetPath?: string;
  dataType?: string;
}

const NoDataView = (props: NoDataViewProps) => {
  const router = useRouter();
  const { resetPath = '', dataType = '' } = props;

  return (
    <Box
      sx={{
        width: '100%',
        pt: 7.5,
        pb: 7.5,
        mb: 5,
        // border: `1px solid ${cjbsTheme.palette.grey['400']}`,
      }}
    >
      <Stack spacing={0.8} justifyContent="center">
        <Stack justifyContent="center" alignItems="center">
          {/*<MyIcon icon="nodata" size={20} />*/}
          {/*{dataType !== "" ? (*/}
          {/*  <Typography variant="body2">수정이력이 없습니다.</Typography>*/}
          {/*) : (*/}
          {/*  <Typography variant="body2">데이터가 존재하지 않습니다.</Typography>*/}
          {/*)}*/}

          <Image
            src={NoResultImage}
            alt="Search"
            width={200}
            height={200}
            quality={70}
          />

          <Title sx={{ mt: '26px', mb: '39px' }}>
            일치하는 검색 결과가 없습니다.
          </Title>
        </Stack>
        {/*<Stack direction="row" justifyContent="center">*/}
        {/*  {resetPath !== "" && (*/}
        {/*    <Link href={resetPath}>*/}
        {/*      <OutlinedButton buttonName="초기화" size="small" />*/}
        {/*      /!*<Typography variant="body2">초기화</Typography>*!/*/}
        {/*    </Link>*/}
        {/*  )}*/}
        {/*</Stack>*/}
      </Stack>
    </Box>
  );
};

export default NoDataView;
