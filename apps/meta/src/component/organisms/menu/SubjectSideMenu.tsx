import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Typography,
  styled,
  Button,
  Chip,
  Stack,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
} from '@mui/material';
import useSWR from 'swr';
import Skeleton from '@mui/material/Skeleton';
import { toast } from 'react-toastify';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  ageState,
  searchInputState,
  selectedFilterState,
} from 'src/recoil/SearchState';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { fetcher } from 'api';
import MyIcon from 'icon/MyIcon';
import { SubjectDetailResponse } from 'src/app/clinical/(subjectlayout)/subject/[code]/types';
import {
  SubjectDetailState,
  SubjectDetailStateType,
} from 'src/recoil/SubjectDetailState';
import { _Link } from 'cjbsDSTM/atoms/Link';
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRight: '0px',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  padding: '13px 24px',
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <MyIcon icon="cheveron-down" size="20px" color="rgba(0, 0, 0, 0.6)" />
    }
    {...props}
  />
))(({ theme }) => ({
  justifyItems: 'center',
  padding: '0px',
  height: '24px',
  marginBottom: '4px',
  minHeight: '24px',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
  '& .MuiAccordionSummary-content': {},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  marginTop: '15px',
  padding: '0px',
}));

export const LOCAL_STORAGE_FILTER_KEY = 'meta-cx-filters';
const SubjectSideMenu = () => {
  const params = useParams();
  const [expanded, setExpanded] = React.useState<string | false>('All');
  const [currentView, setCurrentView] = React.useState<string>('All_All');

  console.log('expanded > ', expanded);

  const setSubjectDetail =
    useSetRecoilState<SubjectDetailStateType>(SubjectDetailState);
  const [activeInfo, setActiveInfo] = useState({
    type: 'categories',
    active: 'All',
    parents: '',
  });

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
      console.log('`${panel}_All` > ', `${panel}_All`);

      setCurrentView(`${panel}_All`);
    };

  const { data, isLoading } = useSWR(`/subject/${params.code}`, fetcher);

  useEffect(() => {
    initLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const initLoad = useCallback(() => {
    if (!isLoading && data) {
      setSubjectDetail({ ...data.data, ...activeInfo });
    }
  }, [isLoading, data, activeInfo]);

  if (isLoading) {
    return (
      <Box mt={'15px'}>
        <Skeleton variant="rectangular" width={238} height={850} />
      </Box>
    );
  } else {
    if (!data?.success) {
      toast(data?.message);
      return <></>;
    }

    const onChangeMenu = (type: string, name: string, parents: string) => {
      console.log('type > ', type);
      console.log('name > ', name);
      console.log('parents > ', parents);

      setActiveInfo({
        type,
        active: name,
        parents,
      });
      setSubjectDetail({
        ...data.data,
        type,
        active: name,
        parents: parents ? parents : '',
      });

      setCurrentView(`${parents}_${name}`);
    };

    const apiData: SubjectDetailResponse = data.data;

    console.log('currentView > ', currentView);

    return (
      <Box>
        <Accordion
          expanded={expanded === 'All'}
          defaultExpanded={true}
          onChange={handleChange('All')}
        >
          <AccordionSummary
            expandIcon={
              <MyIcon
                icon="cheveron-down"
                size="20px"
                color="rgba(0, 0, 0, 0.6)"
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              sx={{
                color: expanded === 'All' ? '#006ECD' : 'black',
              }}
              variant="subtitle2"
            >
              {' '}
              All
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <_Link
              onClick={() => onChangeMenu('categories', 'All', 'All')}
              sx={{ textDecoration: 'none' }}
            >
              <Typography
                sx={{
                  color: currentView === `All_All` ? '#006ECD' : 'black',
                }}
                variant="body2"
                mb={'8px'}
              >
                All
              </Typography>
            </_Link>
            {apiData.categories.map((category, index) => {
              console.log('@#@#', `All_${category.name}`);

              return (
                <_Link
                  key={`link-categories-${index}`}
                  onClick={() =>
                    onChangeMenu('categories', category.name, 'All')
                  }
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography
                    sx={{
                      color:
                        currentView === `All_${category.name}`
                          ? '#006ECD'
                          : 'black',
                    }}
                    variant="body2"
                    mb={'8px'}
                  >
                    {category.name}
                  </Typography>
                </_Link>
              );
            })}
          </AccordionDetails>
        </Accordion>
        {apiData.timePoints.map((timePoint, index) => {
          const label = timePoint.label ? timePoint.label : '';
          return (
            <Accordion
              expanded={expanded === timePoint.label}
              key={`acc-${index}`}
              onChange={handleChange(timePoint.label ? timePoint.label : '')}
            >
              <AccordionSummary
                expandIcon={
                  <MyIcon
                    icon="cheveron-down"
                    size="20px"
                    color="rgba(0, 0, 0, 0.6)"
                  />
                }
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: expanded === timePoint.label ? '#006ECD' : 'black',
                  }}
                >
                  {' '}
                  {timePoint.label}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <_Link
                  onClick={() => onChangeMenu('timePoints', 'All', label)}
                  sx={{ textDecoration: 'none' }}
                >
                  <Typography
                    sx={{
                      color:
                        currentView === `${label}_All` ? '#006ECD' : 'black',
                    }}
                    variant="body2"
                    mb={'8px'}
                  >
                    All
                  </Typography>
                </_Link>
                {timePoint.categories &&
                  timePoint.categories.map((point) => {
                    return (
                      <_Link
                        key={`link-timepoints-${point.code}`}
                        onClick={() =>
                          onChangeMenu('timePoints', point.name, label)
                        }
                        sx={{ textDecoration: 'none' }}
                      >
                        <Typography
                          sx={{
                            color:
                              currentView === `${label}_${point.name}`
                                ? '#006ECD'
                                : 'black',
                          }}
                          variant="body2"
                          mb={'8px'}
                        >
                          {point.name}
                        </Typography>
                      </_Link>
                    );
                  })}
              </AccordionDetails>
            </Accordion>
          );
        })}
      </Box>
    );
  }
};

export default SubjectSideMenu;
