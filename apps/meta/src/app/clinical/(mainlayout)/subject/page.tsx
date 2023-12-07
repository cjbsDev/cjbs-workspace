'use client';
import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { fetcherPost } from 'api';
import useSWRMutation from 'swr/mutation';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { SubjectData } from './types';
import { useRecoilValue } from 'recoil';
import { subjectTotalElements } from 'src/recoil/SubjectState';

import {
  ageState,
  bmiState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';

import {
  AgeType,
  BMIType,
  CheckType,
  Search,
  SelectedFilterValues,
} from '../../types';
import SubjectTable from './table';
import { PAGE_SIZE, TABLE_SKELETON_HEIGHT } from 'src/const/common';
import Title from 'src/component/atoms/Title';

async function getSubjectList(url: string, { arg }: { arg: Search }) {
  return await fetcherPost([url, arg]);
}

const SubjectPage = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const bmi = useRecoilValue<BMIType>(bmiState);
  const totalElements = useRecoilValue<number | null>(subjectTotalElements);

  const findData = checked.filter((item) => item.valid === true);

  const filterData: SelectedFilterValues[] = findData.map((item) => {
    return { field: item.root, code: item.code };
  });

  console.log('SUBJECT BMI', bmi);
  console.log('AGE', age);

  const { trigger, isMutating, data } = useSWRMutation(
    '/subject/list',
    getSubjectList,
  );

  useEffect(() => {
    console.log('POST DATA', postData);
    trigger(postData);
  }, [checked, age, bmi]);

  useEffect(() => {
    !isMutating && setPageLoading(false);
  }, [isMutating]);

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
      size: PAGE_SIZE,
      sort: [],
    },
    list: [],
  };

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

    const _totalElements = totalElements
      ? totalElements.toLocaleString()
      : data?.data.pageInfo.totalElements.toLocaleString();
    const filteredData: SubjectData[] = data.data.subjectList;

    return (
      <Box overflow={'auto'}>
        <Title>{`Subject list(${_totalElements})`}</Title>
        <SubjectTable postData={postData} data={filteredData} />
      </Box>
    );
  }
};

export default SubjectPage;
