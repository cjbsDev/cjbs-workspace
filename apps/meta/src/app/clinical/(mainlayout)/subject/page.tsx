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
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';

import { AgeType, CheckType, Search, SelectedFilterValues } from '../../types';
import SubjectTable from './table';
import { PAGE_SIZE, TABLE_SKELETON_HEIGHT } from 'src/const/common';
import Title from 'src/component/atoms/Title';

async function getSubjectList(url: string, { arg }: { arg: Search }) {
  return await fetcherPost([url, arg]);
}

const Subject = () => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  const checked = useRecoilValue<CheckType[]>(selectedFilterState);
  const keyword = useRecoilValue<string>(searchInputState);
  const age = useRecoilValue<AgeType>(ageState);
  const totalElements = useRecoilValue<number | null>(subjectTotalElements);

  const findData = checked.filter((item) => item.valid === true);

  const filterData: SelectedFilterValues[] = findData.map((item) => {
    return { field: item.root, code: item.code };
  });

  const postData: Search = {
    subjectMinAge: age.subjectMinAge,
    subjectMaxAge: age.subjectMaxAge,
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

  const { trigger, isMutating, data } = useSWRMutation(
    '/subject/list',
    getSubjectList,
  );

  useEffect(() => {
    trigger(postData);
  }, []);

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

export default Subject;
