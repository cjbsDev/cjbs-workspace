'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Autocomplete,
  Box,
  IconButton,
  Input,
  InputAdornment,
  TextField,
} from '@mui/material';
import { POST, fetcher, metaFetcher } from 'api';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import MyIcon from 'icon/MyIcon';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  searchInputState,
  searchNoResultState,
  searchPageKeyDownState,
  searchPageTextState,
} from 'src/recoil/SearchState';
import { LightTooltip } from 'cjbsDSTM/atoms/Tooltip';

const SearchScreen = () => {
  const [text, setText] = useState('');
  const setSearchKeyword = useSetRecoilState<string>(searchInputState);

  const { data, isLoading } = useSWR('/filter/autocomplete', metaFetcher);

  const onKeydownSearchText = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (text.length > 2 && e.key === 'Enter') {
        setSearchKeyword(text);
      }
    },
    [text],
  );

  if (isLoading) {
    return (
      <Box
        width={'100%'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={'24px'}
      >
        <Skeleton variant="rectangular" width={'70%'} height={50} />
      </Box>
    );
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }
  }

  const options: string[] = data.data.result;

  return (
    <Box
      width={'100%'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      mt={'24px'}
    >
      <Box width={'70%'}>
        <LightTooltip
          title={'3글자 이상, Enter를 입력해 주세요.'}
          placement={'top'}
        >
          <Autocomplete
            disableClearable
            forcePopupIcon={false}
            options={options}
            value={text}
            onInputChange={(event, newInputValue) => {
              setText(newInputValue);
            }}
            onKeyDown={onKeydownSearchText}
            sx={{
              width: '100%',
              '& input': {
                height: '18px',
              },
            }}
            inputValue={text}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="검색어를 입력해 주세요."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <InputAdornment position="end">
                      <MyIcon icon={'search'} size={20} color="gray" />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </LightTooltip>
      </Box>
    </Box>
  );
};

export default SearchScreen;
