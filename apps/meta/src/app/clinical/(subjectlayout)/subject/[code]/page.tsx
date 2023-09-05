'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Chip,
  Divider,
  Fab,
  Skeleton,
  Tab,
  Tabs,
  Typography,
  styled,
} from '@mui/material';
import { fetcherPost } from 'api';
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
} from '../../../types';
import { isNull } from 'src/util/validation';
import {
  SubjectDetailState,
  SubjectDetailStateType,
} from 'src/recoil/SubjectDetailState';
import SubjectInfo, {
  NameValue,
} from 'src/component/molecules/subject/SubjectInfo';
import Categories from './categories';
import TimePoints from './timepoints';
import Title from 'src/component/atoms/Title';
import { _Link } from 'cjbsDSTM/atoms/Link';
import CategoryAll from './categories-all';
import CategoriesAll from './categories-all';
const GrayBox = styled(Box)`
  background: #f8f9fa;
  width: '100%';
  height: 100%;
  padding: 45px 42px;
`;

const SubjectDetail = ({ params }: { params: { code: string } }) => {
  const [pageLoading, setPageLoading] = useState<boolean>(true);
  const subjectDetail =
    useRecoilValue<SubjectDetailStateType>(SubjectDetailState);
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
      size: 15,
      sort: [],
    },
    list: [],
  };

  const categories = subjectDetail.categories;
  const timePoints = subjectDetail.timePoints;
  const type = subjectDetail.type;
  const active = subjectDetail.active;
  const parents = subjectDetail.parents;

  const SubjectInfoData: NameValue[] = [
    { name: '대상자 분류', value: subjectDetail.group },
    {
      name: '성별 / 나이',
      value: `${subjectDetail.sex} / ${subjectDetail.age}`,
    },
    {
      name: '키 / 체중',
      value: `${subjectDetail.height} / ${subjectDetail.weight}`,
    },
    { name: '수집 샘플 종류', value: subjectDetail.sampleTypeList },
    { name: 'Date', value: subjectDetail.date },
  ];

  return (
    <Box sx={{ height: '100%', background: '#F8F9FA' }}>
      {subjectDetail.age === null && (
        <Box padding={'0px 40px 0px 40px'}>
          <Box mb={'60px'}>
            <Skeleton width={'100%'} height={'250px'} />
          </Box>
          <Box>
            <Skeleton variant="rectangular" width={'100%'} height={950} />
          </Box>
        </Box>
      )}
      {subjectDetail.age && (
        <Box>
          <Box
            padding={'0px 40px 0px 40px'}
            height={'223px'}
            overflow={'auto'}
            sx={{ backgroundColor: 'white' }}
          >
            <Box mb={'25px'}>
              <Typography mb={'10px'} variant="body2">
                <_Link href="/clinical/subject">Subject list</_Link> &gt; Detail
              </Typography>
              <Title>{`${subjectDetail.code}`}</Title>
            </Box>
            <SubjectInfo data={SubjectInfoData} />
          </Box>

          <GrayBox>
            {type === 'categories' && active !== 'All' && (
              <Categories categories={categories} active={active} />
            )}
            {type === 'categories' && active === 'All' && (
              <CategoriesAll
                timePoints={timePoints}
                active={active}
                parents={parents}
              />
            )}
            {type === 'timePoints' && (
              <TimePoints
                timePoints={timePoints}
                active={active}
                parents={parents}
              />
            )}
          </GrayBox>
        </Box>
      )}
    </Box>
  );
};

export default SubjectDetail;
