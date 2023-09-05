'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import useSWRMutation from 'swr/mutation';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { SampleData } from './types';
import { useRecoilValue } from 'recoil';

import { AgeType, CheckType, Search, SelectedFilterValues } from '../../types';
import SampleTable from './table';
import { Title1 } from 'cjbsDSTM';
import { subjectTotalElements } from 'src/recoil/SubjectState';
import { isNull } from 'src/util/validation';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import { fetcherPost } from 'api';
import { PAGE_SIZE, TABLE_SKELETON_HEIGHT } from 'src/const/common';
import { useParams } from 'next/navigation';
import Title from 'src/component/atoms/Title';

async function getSampleList(url: string, { arg }: { arg: Search }) {
  return await fetcherPost([url, arg]);
}

const Subject = () => {
  const params = useParams();
  const isSearch = params.s ? params.s : 'y';
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
    '/sample/list',
    getSampleList,
  );

  useEffect(() => {
    trigger(postData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const filteredData: SampleData[] = data.data.sampleList;

    return (
      <Box>
        <Title>{`Sample list(${_totalElements})`}</Title>
        <SampleTable postData={postData} data={filteredData} />
      </Box>
    );
  }
};

export default Subject;
