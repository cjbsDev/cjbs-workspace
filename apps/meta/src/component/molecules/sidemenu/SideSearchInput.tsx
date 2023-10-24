import React, { useState, useEffect, useCallback } from 'react';
import {
  Autocomplete,
  TextField,
  Tooltip,
  InputAdornment,
} from '@mui/material';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import { fetcher } from 'api';
import { ageState, searchInputState } from 'src/recoil/SearchState';
import { LightTooltip } from 'cjbsDSTM/atoms/Tooltip';
import MyIcon from 'icon/MyIcon';
import { usePathname, useRouter } from 'next/navigation';
import { DASHBOARD_URL, SEARCH_URL } from 'src/const/common';

const PALCEHOLDER_SEARCH_FIELD = '검색어를 입력해 주세요.';

const SideSearchInput = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchInput, setSearchInput] =
    useRecoilState<string>(searchInputState);
  const [inputValue, setInputValue] = useState<string>('');
  const { data, isLoading } = useSWR('/filter/autocomplete', fetcher);

  const onSearchKeyUp = useCallback(
    async (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        (e.key === 'Enter' && inputValue.length > 2) ||
        (e.key === 'Enter' && inputValue.length === 0)
      ) {
        console.log('####');

        setSearchInput(inputValue);
        if (pathname === DASHBOARD_URL) {
          router.push(SEARCH_URL);
        }
      }
    },
    [inputValue],
  );

  if (isLoading) {
    return <Skeleton variant="rectangular" width={'100%'} height={38} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const options: string[] = data.data.result;

    return (
      <>
        <LightTooltip
          title={'3글자 이상, Enter를 입력해 주세요.'}
          placement={'top'}
        >
          <Autocomplete
            disableClearable
            forcePopupIcon={false}
            options={options}
            placeholder={PALCEHOLDER_SEARCH_FIELD}
            value={searchInput}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            sx={{
              width: '238px',
              '& input': {
                height: '5px',
              },
            }}
            inputValue={inputValue}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={PALCEHOLDER_SEARCH_FIELD}
                onKeyDown={onSearchKeyUp}
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
      </>
    );
  }
};

export default SideSearchInput;
