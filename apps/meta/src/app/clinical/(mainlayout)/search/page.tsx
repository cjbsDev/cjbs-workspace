'use client';
import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { fetcherPost } from 'api';
import Image from 'next/image';
import SearchImage from 'public/img/search/search.png';
import NoResultImage from 'public/img/search/no-result.png';
import {
  ageState,
  bmiState,
  searchInputState,
  searchNoResultState,
  searchRenderTextState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useSWRMutation from 'swr/mutation';
import { AgeType, CheckType, Search, SelectedFilterValues } from './types';
import SearchScreen from './search';
import SearchTable from './table';
import MyIcon from 'icon/MyIcon';
import Title from 'src/component/atoms/Title';

async function getSearch(url: string, { arg }: { arg: Search }) {
  return await fetcherPost([url, arg]);
}

const SearchPage = () => {
  const setRenderText = useSetRecoilState<string>(searchRenderTextState);
  const [searchKeyword, setSearchKeyword] =
    useRecoilState<string>(searchInputState);
  const [checked, setChecked] =
    useRecoilState<CheckType[]>(selectedFilterState);
  const [age, setAge] = useRecoilState<AgeType>(ageState);
  const [ageBMI, setAgeBMI] = useRecoilState(bmiState);
  const [isInit, setIsInit] = useState<boolean>(false);

  let tempSearchInput = '';

  const { trigger, isMutating, data } = useSWRMutation(
    '/common/search',
    getSearch,
  );

  useEffect(() => {
    tempSearchInput = searchKeyword;
  }, []);

  useEffect(() => {
    const findData = checked.filter((item) => item.valid === true);
    const filterData: SelectedFilterValues[] = findData.map((item) => {
      return { field: item.root, code: item.code };
    });

    console.log('asdasdadasds', age);

    console.log('BMI#$%#$%#$%#$%', ageBMI);

    if (
      filterData.length > 0 ||
      searchKeyword.length > 2 ||
      age.subjectMaxAge !== 0 ||
      age.subjectMinAge !== 0 ||
      ageBMI.bmiMaxAge !== 0 ||
      ageBMI.bmiMinAge !== 0
    ) {
      console.log('#!@#!@#!@');

      const subjectMinAge = age.subjectMinAge;
      const subjectMaxAge = age.subjectMaxAge;

      const bmiMinAge = ageBMI.bmiMinAge;
      const bmiMaxAge = ageBMI.bmiMaxAge;

      const postData: Search = {
        subjectMinAge: subjectMinAge,
        subjectMaxAge: subjectMaxAge,
        bmiMaxValue: bmiMaxAge,
        bmiMinValue: bmiMinAge,
        resultKeyword: '',
        keyword: searchKeyword,
        filter: filterData,
        page: {
          page: 1,
          size: 5,
          sort: [],
        },
      };
      setIsInit(false);
      trigger(postData);
    }

    tempSearchInput = searchKeyword;
  }, [checked, age, ageBMI, searchKeyword]);

  const allClearFilter = () => {
    const clearChecked = checked.map((item) => {
      return { ...item, checked: false, valid: false };
    });
    setAge({
      subjectMaxAge: 0,
      subjectMinAge: 0,
    });
    setAgeBMI({
      bmiMinAge: 0,
      bmiMaxAge: 0,
    });
    setSearchKeyword('');
    setChecked(clearChecked);
    setIsInit(true);
    setRenderText('');
    tempSearchInput = '';
  };

  const findData = checked.filter((item) => item.valid === true);
  const filterData: SelectedFilterValues[] = findData.map((item) => {
    return { field: item.root, code: item.code };
  });

  const resData = data?.data;

  const noResult =
    resData &&
    resData.subjectCount === 0 &&
    resData.diseaseCount === 0 &&
    resData.sampleCount === 0 &&
    resData.studyCount === 0
      ? true
      : false;

  console.log('noResult > ', noResult);

  return (
    <Box>
      <Title>
        {' '}
        {searchKeyword.length === 0 && data === undefined
          ? '통합검색'
          : 'Search results'}{' '}
      </Title>
      {resData === undefined ||
      isMutating ||
      isInit ||
      noResult ||
      (searchKeyword.length === 0 &&
        filterData.length === 0 &&
        age.subjectMaxAge === 0 &&
        age.subjectMinAge === 0 &&
        ageBMI.bmiMaxAge === 0 &&
        ageBMI.bmiMinAge === 0) ? (
        <Box width={'100%'} mt={'24px'}>
          <SearchScreen />
          <Box
            pt={'63px'}
            width={'100%'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            {isMutating ? (
              <CircularProgress sx={{ mt: '40px' }} size={'50px'} />
            ) : (
              <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Image
                  src={!isInit && noResult ? NoResultImage : SearchImage}
                  alt="Search"
                  width={200}
                  height={200}
                  quality={70}
                />
                {!isInit && noResult && (
                  <Box
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                  >
                    <Title sx={{ mt: '26px', mb: '39px' }}>
                      일치하는 검색 결과가 없습니다.
                    </Title>
                    <Button
                      onClick={allClearFilter}
                      startIcon={
                        <MyIcon icon="arrow-clockwise" size={'15px'}></MyIcon>
                      }
                      size="small"
                      variant="outlined"
                    >
                      <Typography variant="button">검색 초기화</Typography>
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <Box>
          <SearchTable data={data?.data} />
        </Box>
      )}
    </Box>
  );
};

export default SearchPage;
