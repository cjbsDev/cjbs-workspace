'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { POST, fetcherPost } from 'api';
import useSWRMutation from 'swr/mutation';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { Title1 } from '../../../../../../packages/cjbsDSTM';
import { SampleData } from './types';
import { useRecoilValue } from 'recoil';
import { subjectTotalElements } from 'src/recoil/SubjectState';

import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';

import {
  AgeType,
  CheckType,
  Search,
  SelectedFilterValues,
} from '../search/types';
import { isNull } from 'src/util/validation';
import SampleTable from './table';

export async function getSampleList(url: string, { arg }: { arg: Search }) {
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
    subjectMinAge: !isNull(age.subjectMinAge) ? age.subjectMinAge : null,
    subjectMaxAge: !isNull(age.subjectMaxAge) ? age.subjectMaxAge : null,
    resultKeyword: '',
    keyword: keyword,
    filter: filterData,
    page: {
      page: 1,
      size: 15,
      sort: [],
    },
    list: [],
  };

  const { trigger, isMutating, data } = useSWRMutation(
    '/sample/list',
    getSampleList,
  );

  useEffect(() => {
    trigger(postData);
  }, []);

  useEffect(() => {
    !isMutating && setPageLoading(false);
  }, [isMutating]);

  if (pageLoading) {
    return <Skeleton variant="rectangular" width={'100%'} height={500} />;
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const _totalElements = totalElements
      ? totalElements.toLocaleString()
      : data?.data.pageInfo.totalElements.toLocaleString();
    const filteredData: SampleData[] = data.data.sampleList;

    return (
      <Box overflow={'auto'}>
        <Title1 titleName={`Sample list(${_totalElements})`} />
        <SampleTable postData={postData} data={filteredData} />
      </Box>
    );
  }
};

export default Subject;
