'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { POST, fetcherPost } from 'api';
import useSWRMutation from 'swr/mutation';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { useRecoilValue } from 'recoil';

import {
  ageState,
  bmiState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';

import StudyTable from './table';
import { StudyCount, StudyData } from './types';
import {
  Search,
  CheckType,
  AgeType,
  SelectedFilterValues,
  BMIType,
} from '../../types';
import { PAGE_SIZE, TABLE_SKELETON_HEIGHT } from 'src/const/common';
import Title from 'src/component/atoms/Title';
import {
  studyCountState,
  studyTotalElementsState,
} from 'src/recoil/StudyState';

async function getStudyList(url: string, { arg }: { arg: Search }) {
  return await fetcherPost([url, arg]);
}

const Study = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const bmi = useRecoilValue<BMIType>(bmiState);
  const studyCountValue = useRecoilValue<StudyCount | null>(studyCountState);

  const findData = checked.filter((item) => item.valid === true);

  const filterData: SelectedFilterValues[] = findData.map((item) => {
    return { field: item.root, code: item.code };
  });

  const postData: Search = {
    subjectMinAge: age.subjectMinAge,
    subjectMaxAge: age.subjectMaxAge,
    bmiMaxValue: bmi.bmiMaxValue,
    bmiMinValue: bmi.bmiMinValue,
    resultKeyword: '',
    keyword: keyword,
    filter: filterData,
    page: {
      page: 1,
      size: 1000,
      sort: [],
    },
    list: [],
  };

  const { trigger, isMutating, data } = useSWRMutation(
    '/disease/study/list',
    getStudyList,
  );

  useEffect(() => {
    trigger(postData);
  }, [checked, age, bmi]);

  useEffect(() => {
    !isMutating && setPageLoading(false);
  }, [isMutating]);

  if (pageLoading) {
    return (
      <Skeleton
        variant="rectangular"
        width={'100%'}
        height={TABLE_SKELETON_HEIGHT}
      />
    );
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    // const _totalElements = totalElements
    //   ? totalElements.toLocaleString()
    //   : data?.data.pageInfo.totalElements.toLocaleString();

    const studyCount = studyCountValue
      ? studyCountValue
      : {
          diseaseCount: data?.data.diseaseCount,
          studyCount: data?.data.studyCount,
        };

    const filteredData: StudyData[] = data.data.diseaseStudies;

    return (
      <Box>
        <Title>{`Disease/Study list(${studyCount.diseaseCount}/${studyCount.studyCount})`}</Title>
        <StudyTable postData={postData} data={filteredData} />
      </Box>
    );
  }
};

export default Study;
