import React, { useState, useEffect, useCallback } from 'react';
import { Autocomplete, TextField, Tooltip } from '@mui/material';
import useSWR from 'swr';
import { POST, fetcher } from 'api';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import { useRecoilState } from 'recoil';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import { AgeType, CheckType } from 'src/app/clinical/search/types';
import { useDebounce } from 'src/util/event';

const PALCEHOLDER_SEARCH_FIELD = '검색어를 입력하세요.';

const SideSearchInput = () => {
  const [value, setValue] = useState<string | null>('');
  const [searchInput, setSearchInput] =
    useRecoilState<string>(searchInputState);
  const [checked, setChecked] =
    useRecoilState<CheckType[]>(selectedFilterState);
  const [age, setAge] = useRecoilState<AgeType>(ageState);
  const [inputValue, setInputValue] = useState<string>('');
  const { data, isLoading } = useSWR('/filter/autocomplete', fetcher);

  const debouncedQuery = useDebounce(inputValue, 300);

  useEffect(() => {
    setSearchInput(debouncedQuery);
    if (debouncedQuery && debouncedQuery.trim().length > 0) {
      // search(
      //   checked,
      //   debouncedQuery,
      //   null,
      //   age.subjectMinAge,
      //   age.subjectMaxAge,
      //   null,
      // );
    }
  }, [checked, age, debouncedQuery]);

  // const onSearchKeyUp = useCallback(
  //   async (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     console.log('### >>> value', debouncedQuery);

  //     // if (e.key === 'Enter' && inputValue.length > 2) {
  //     //   let filters = await localStorage.getItem(LOCAL_STORAGE_FILTER_KEY);

  //     //   if (!filters) {
  //     //     let newFilters: string[] = [];
  //     //     newFilters.unshift(inputValue);

  //     //     const set = new Set(newFilters);
  //     //     const uniqueArray = [...set];

  //     //     localStorage.setItem(
  //     //       LOCAL_STORAGE_FILTER_KEY,
  //     //       JSON.stringify(uniqueArray),
  //     //     );
  //     //     setSearchFilterState(uniqueArray);
  //     //   } else {
  //     //     let filterArray: string[] = JSON.parse(filters);
  //     //     filterArray.unshift(inputValue);

  //     //     const set = new Set(filterArray);
  //     //     const uniqueArray = [...set];
  //     //     localStorage.setItem(
  //     //       LOCAL_STORAGE_FILTER_KEY,
  //     //       JSON.stringify(uniqueArray),
  //     //     );
  //     //     setSearchFilterState(uniqueArray);
  //     //   }
  //     // }
  //   },
  //   [],
  // );

  if (isLoading) {
    return <Skeleton variant="rectangular" width={'100%'} height={100} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const options: string[] = data.data.result;

    return (
      <>
        <Tooltip
          title="Please enter at least 3 characters."
          placement="top"
          arrow
        >
          <Autocomplete
            freeSolo
            options={options}
            placeholder={PALCEHOLDER_SEARCH_FIELD}
            value={value}
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
                //    onKeyUp={onSearchKeyUp}
              />
            )}
          />
        </Tooltip>
      </>
    );
  }
};

const SearchAutocompleate = styled(Autocomplete)`
  border: 1px solid rgba(134, 142, 149, 0.5);
  border-radius: 2px;
  padding: 8px 12px;
`;

const SearchTextField = styled(TextField)`
  padding: 8px 12px;
  width: 238px;
  height: 34px;
`;

export default SideSearchInput;
